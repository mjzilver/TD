import { Building } from './building.js';
import { Arrow } from './arrow.js';

export class Tower extends Building {
    constructor(x, y) {
        super(x, y, 'T');
        this.hp = 10;
        this.range = 5;
        this.delay = 30;
        this.lastShot = 0;
        this.damage = 5;
    }

    canShoot(currentTicks) {
        return currentTicks - this.lastShot >= this.delay;
    }

    createArrow(towerMiddleX, towerMiddleY, vx, vy) {
       return new Arrow(towerMiddleX, towerMiddleY, vx, vy, this.damage);
    }
}