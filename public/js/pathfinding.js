import { PriorityQueue } from './utils.js';

// Function to find the shortest path using A* algorithm
export function findPath(startX, startY, goalX, goalY, mapWidth, mapHeight, getBuildingAtPosition, monster) {
    const start = { x: startX, y: startY };
    const goal = { x: goalX, y: goalY };

    const frontier = new PriorityQueue();
    frontier.enqueue(start, 0);

    const cameFrom = {};
    const costSoFar = {};
    const startKey = `${start.x},${start.y}`;
    cameFrom[startKey] = null;
    costSoFar[startKey] = 0;

    while (!frontier.isEmpty()) {
        const current = frontier.dequeue();
        const currentKey = `${current.x},${current.y}`;

        if (current.x === goal.x && current.y === goal.y) break;

        const neighbors = getNeighbors(current, mapWidth, mapHeight, monster.canMoveDiagonally);

        for (const neighbor of neighbors) {
            const neighborKey = `${neighbor.x},${neighbor.y}`;
            let weight = 1;

            const building = getBuildingAtPosition(neighbor.x, neighbor.y);
            if (building) {
                weight = Math.max(building.hp / monster.damage, 2);

                if (!canAttack(current.x, current.y, neighbor.x, neighbor.y)) {
                    continue;
                }
            }

            const newCost = costSoFar[currentKey] + weight;

            if (!(neighborKey in costSoFar) || newCost < costSoFar[neighborKey]) {
                costSoFar[neighborKey] = newCost;
                const priority = newCost + heuristic(neighbor, goal);
                frontier.enqueue(neighbor, priority);
                cameFrom[neighborKey] = current;
            }
        }
    }

    return reconstructPath(start, goal, cameFrom);
}

// Heuristic function: Manhattan distance
function heuristic(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

// Validate path function
export function validatePath(path, monster, getBuildingAtPosition) {
    for (let i = 0; i < path.length - 1; i++) {
        const current = path[i];
        const next = path[i + 1];

        if (!canAttack(current.x, current.y, next.x, next.y)) {
            return false;
        }

        const building = getBuildingAtPosition(next.x, next.y);
        if (building && building.hp < monster.damage) {
            return false;
        }
    }

    return true;
}

function canAttack(fromX, fromY, toX, toY) {
    // You can't attack diagonally
    return fromX === toX || fromY === toY;
}

// Function to get the neighbors of a node
function getNeighbors({ x, y }, mapWidth, mapHeight, canMoveDiagonally) {
    const directions = [
        { dx: 0, dy: -1 }, // Up
        { dx: 0, dy: 1 },  // Down
        { dx: -1, dy: 0 }, // Left
        { dx: 1, dy: 0 }   // Right
    ];

    if (canMoveDiagonally) {
        directions.push(
            { dx: -1, dy: -1 }, // Top Left
            { dx: 1, dy: -1 },  // Top Right
            { dx: -1, dy: 1 },  // Bottom Left
            { dx: 1, dy: 1 }    // Bottom Right
        );
    }

    const neighbors = [];
    for (const { dx, dy } of directions) {
        const newX = x + dx;
        const newY = y + dy;
        if (newX >= 0 && newX < mapWidth && newY >= 0 && newY < mapHeight) {
            neighbors.push({ x: newX, y: newY });
        }
    }

    return neighbors;
}

// Function to reconstruct the path from start to goal
function reconstructPath(start, goal, cameFrom) {
    const path = [];
    let current = goal;
    let currentKey = `${current.x},${current.y}`;

    while (currentKey) {
        path.push({ x: current.x, y: current.y });
        current = cameFrom[currentKey];
        if (current) {
            currentKey = `${current.x},${current.y}`;
        } else {
            currentKey = null;
        }
    }

    path.reverse(); // Reverse the path to get the correct order from start to goal
    return path;
}
