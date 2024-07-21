export class PriorityQueue {
    constructor() {
        this.elements = [];
    }

    enqueue(item, priority) {
        this.elements.push({ item, priority });
        this.elements.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        return this.elements.shift().item;
    }

    isEmpty() {
        return this.elements.length === 0;
    }
}

export function outOfBoundsCheck(x, y, mapWidth, mapHeight) {
    return x < 0 || x >= mapWidth || y < 0 || y >= mapHeight;
}