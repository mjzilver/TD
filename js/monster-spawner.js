import { Boss } from './entities/boss.js';
import { Monster } from './entities/monster.js';

const highest = 5 * 6000;

export class MonsterSpawner {
    constructor(mapWidth, mapHeight) {
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.previousTicks = 0;
        this.lastBossSpawn = 0;
    }

    linearInterpolation(currentTicks, maxTicks, minInterval, maxInterval) {
        // Ensure currentTicks does not exceed maxTicks
        const clampedTicks = Math.min(currentTicks, maxTicks);

        // Linear interpolation
        const interval = maxInterval - ((maxInterval - minInterval) * (clampedTicks / maxTicks));

        return interval;
    }

    spawn(monsters, currentTicks, gameEngine) {
        let spawnInterval = this.linearInterpolation(currentTicks, highest, 1, 50);

        if (currentTicks - this.previousTicks < spawnInterval) {
            return;
        }
         // 0: Top, 1: Right, 2: Bottom, 3: Left
        const edge = Math.floor(Math.random() * 4);
        let x = 0;
        let y = 0;

        switch (edge) {
            case 0: // Top edge
                x = Math.floor(Math.random() * this.mapWidth);
                y = 0;
                break;
            case 1: // Right edge
                x = this.mapWidth - 1;
                y = Math.floor(Math.random() * this.mapHeight);
                break;
            case 2: // Bottom edge
                x = Math.floor(Math.random() * this.mapWidth);
                y = this.mapHeight - 1;
                break;
            case 3: // Left edge
                x = 0;
                y = Math.floor(Math.random() * this.mapHeight);
                break;
        }

        let mon = new Monster(x, y);

        // Every 200 ticks, spawn a boss
        if (this.lastBossSpawn + 200 < currentTicks) {
            mon = new Boss(x, y);
            this.lastBossSpawn = currentTicks;
        } else {
            mon.hp = Math.floor(this.linearInterpolation(currentTicks, highest, 50, 5));
            mon.damage = Math.floor(this.linearInterpolation(currentTicks, highest, 8, 1));
        }

        // Check if the spawn point is blocked
        if (gameEngine.isPositionOccupied(x, y)) {
            // Combine
            const monsterAt = monsters.find(m => m.x === x && m.y === y);
            if (monsterAt) {
                gameEngine.combineMonsters(mon, monsterAt);
            } else {
                // If the spawn point is blocked by a building, destroy the building
                const building = gameEngine.getBuildingAtPosition(x, y);
                if (building) {
                    gameEngine.destroyBuilding(building);
                }
            }
        }
    
        monsters.push(mon);
        this.previousTicks = currentTicks;
    }
}
