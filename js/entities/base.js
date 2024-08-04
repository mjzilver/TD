import { Building } from './building.js';

export class Base extends Building {
    constructor(x, y) {
        super(x, y, '#');
        this.hp = 100;
    }
}