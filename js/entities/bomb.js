import { Arrow } from './arrow.js';

export class Bomb extends Arrow {
    constructor(x, y, vx, vy, damage = 5) {
        super(x, y, vx, vy, damage);
        this.char = 'o';
        this.damage = damage;
        this.blastRadius = 3;
    }

    draw(ctx, cameraX, cameraY) {
        ctx.fillStyle = 'black';
        ctx.font = '15px Monospace';
        ctx.fillText(this.char, this.x - cameraX, this.y - cameraY);
    }
}