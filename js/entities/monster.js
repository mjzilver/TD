import { GameEntity } from './game-entity.js';

export class Monster extends GameEntity {
    constructor(x, y) {
        super(x, y);
        this.char = 'M';
        this.path = [];
        this.hp = 10;
        this.startHp = this.hp;
        this.damage = 1;
        this.canMoveDiagonally = false;
    }

    moveTo(x, y) {
        this.x = x;
        this.y = y;
    }

    attack(building) {
        building.hp -= this.damage;
    }

    setPath(path) {
        this.path = path;
    }

    getPath() {
        return this.path;
    }
}