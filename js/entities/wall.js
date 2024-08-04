import { Building } from './building.js';

export class Wall extends Building {
    constructor(x, y) {
        super(x, y, 'W');
        this.hp = 5;
    }
}