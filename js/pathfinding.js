import { PriorityQueue } from './utils.js';

export class PathFinder {
    constructor(mapWidth, mapHeight, game) {
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.game = game;
        this.cache = {};
    }

    findPath(startX, startY, goalX, goalY, monster) {
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

            const neighbors = this.getNeighbors(current, this.mapWidth, this.mapHeight, monster.canMoveDiagonally);

            for (const neighbor of neighbors) {
                const neighborKey = `${neighbor.x},${neighbor.y}`;
                let weight = 1;

                const building = this.game.getBuildingAtPosition(neighbor.x, neighbor.y);
                if (building) {
                    weight = Math.max(building.hp / monster.damage, 2);

                    if (!this.canAttack(current.x, current.y, neighbor.x, neighbor.y)) {
                        continue;
                    }
                }

                const newCost = costSoFar[currentKey] + weight;

                if (!(neighborKey in costSoFar) || newCost < costSoFar[neighborKey]) {
                    costSoFar[neighborKey] = newCost;
                    const priority = newCost + this.heuristic(neighbor, goal);
                    frontier.enqueue(neighbor, priority);
                    cameFrom[neighborKey] = current;
                }
            }
        }

        return this.reconstructPath(start, goal, cameFrom);
    }

    // Heuristic function: Manhattan distance
    heuristic(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

    canAttack(fromX, fromY, toX, toY) {
        // You can't attack diagonally
        return fromX === toX || fromY === toY;
    }

    // Function to get the neighbors of a node
    getNeighbors({ x, y }, mapWidth, mapHeight, canMoveDiagonally) {
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
    reconstructPath(start, goal, cameFrom) {
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

        path.reverse();
        return path;
    }
}