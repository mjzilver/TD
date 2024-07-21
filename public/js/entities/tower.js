import { Building } from './building.js';

export class Tower extends Building {
    constructor(x, y) {
        super(x, y, 'T');
        this.hp = 10;
        this.range = 5;
        this.delay = 8;
        this.lastShot = 0;
    }

    canShoot(currentTicks) {
        return currentTicks - this.lastShot >= this.delay;
    }
}