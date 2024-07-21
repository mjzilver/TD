import { Monster } from './entities/monster.js';

export class MonsterSpawner {
    constructor(mapWidth, mapHeight) {
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.previousTicks = 0;
    }


    linearInterpolation(currentTicks, maxTicks, minInterval, maxInterval) {
        // Ensure currentTicks does not exceed maxTicks
        const clampedTicks = Math.min(currentTicks, maxTicks);
    
        // Linear interpolation
        const interval = maxInterval - ((maxInterval - minInterval) * (clampedTicks / maxTicks));
    
        return interval;
    }

    spawn(monsters, currentTicks) {
        let spawnInterval = this.linearInterpolation(currentTicks, 3000, 1, 50);

        if (currentTicks - this.previousTicks < spawnInterval) {
            return;
        }

        const side = Math.floor(Math.random() * 4);

        let x = 0;
        let y = 0;

        switch (side) {
            case 0: // Top
                x = Math.floor(Math.random() * this.mapWidth);
                y = 0;
                break;
            case 1: // Right
                x = this.mapWidth - 1;
                y = Math.floor(Math.random() * this.mapHeight);
                break;
            case 2: // Bottom
                x = Math.floor(Math.random() * this.mapWidth);
                y = this.mapHeight - 1;
                break;
            case 3: // Left
                x = 0;
                y = Math.floor(Math.random() * this.mapHeight);
                break;
        }

        let mon = new Monster(x, y);

        mon.hp = Math.floor(this.linearInterpolation(currentTicks, 6000, 100, 5));
        mon.damage = Math.floor(this.linearInterpolation(currentTicks, 6000, 33, 1));

        monsters.push(mon);
        this.previousTicks = currentTicks;
    }
}