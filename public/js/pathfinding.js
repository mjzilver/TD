import { PriorityQueue } from './utils.js';

// Function to find the shortest path using A* algorithm
export function findPath(startX, startY, goalX, goalY, mapWidth, mapHeight, getBuildingAtPosition, monster) {
    const start = { x: startX, y: startY };
    const goal = { x: goalX, y: goalY };

    const frontier = new PriorityQueue();
    frontier.enqueue(start, 0);

    const cameFrom = new Map();
    const costSoFar = new Map();
    cameFrom.set(JSON.stringify(start), null);
    costSoFar.set(JSON.stringify(start), 0);

    while (!frontier.isEmpty()) {
        const current = frontier.dequeue();

        if (current.x === goal.x && current.y === goal.y) break;

        const neighbors = getNeighbors(current, mapWidth, mapHeight);

        for (const neighbor of neighbors) {
            let weight = 1;
            
            let building = getBuildingAtPosition(neighbor.x, neighbor.y)
            if (building) {
                weight = building.hp / monster.damage;
            }

            const newCost = costSoFar.get(JSON.stringify(current)) + weight;
            const neighborKey = JSON.stringify(neighbor);

            if (!costSoFar.has(neighborKey) || newCost < costSoFar.get(neighborKey)) {
                costSoFar.set(neighborKey, newCost);
                const priority = newCost;
                frontier.enqueue(neighbor, priority);
                cameFrom.set(neighborKey, current);
            }
        }
    }

    return reconstructPath(start, goal, cameFrom);
}

// Function to get the neighbors of a node
function getNeighbors({ x, y }, mapWidth, mapHeight) {
    const directions = [
        { dx: 0, dy: -1 }, // Up
        { dx: 0, dy: 1 },  // Down
        { dx: -1, dy: 0 }, // Left
        { dx: 1, dy: 0 }   // Right
    ];

    return directions.reduce((neighbors, { dx, dy }) => {
        const newX = x + dx;
        const newY = y + dy;
        const isInBounds = newX >= 0 && newX < mapWidth && newY >= 0 && newY < mapHeight;

        if (isInBounds) {
            neighbors.push({ x: newX, y: newY });
        }

        return neighbors;
    }, []);
}

// Function to reconstruct the path from start to goal
function reconstructPath(start, goal, cameFrom) {
    const path = [];
    let current = goal;

    while (current) {
        path.push({ x: current.x, y: current.y });
        current = cameFrom.get(JSON.stringify(current));
    }

    path.reverse(); // Reverse the path to get the correct order from start to goal
    return path;
}
