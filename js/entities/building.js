import { GameEntity } from './game-entity.js';

export class Building extends GameEntity {
    constructor(x, y, char) {
        super(x, y);
        this.hp = 10;
        this.char = char;
        this.cost = 10;
        this.upgradeCost = 0;
    }
}
