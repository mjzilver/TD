import { Monster } from './monster.js';

export class TankMonster extends Monster {
    constructor(x, y) {
        super(x, y);
        this.char = 'T';
        this.hp = 100;
        this.startHp = this.hp;
        this.damage = 2;
        this.canMoveDiagonally = false;
    }
}