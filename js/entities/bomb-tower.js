import { Bomb } from './bomb.js';
import { Tower } from './tower.js';

export class BombTower extends Tower {
    constructor(x, y) {
        super(x, y);
        this.char = 'B';
        this.hp = 15;
        this.range = 7;
        this.delay = 60;
        this.lastShot = 0;
        this.damage = 15;
        this.cost = 50;
    }

    canShoot(currentTicks) {
        return currentTicks - this.lastShot >= this.delay;
    }

    createArrow(towerMiddleX, towerMiddleY, vx, vy) {
        return new Bomb(towerMiddleX, towerMiddleY, vx, vy, this.damage);
    }
}