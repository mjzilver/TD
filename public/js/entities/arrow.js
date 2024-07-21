import { GameEntity } from './game-entity.js';

export class Arrow extends GameEntity {
    constructor(x, y, vx, vy) {
        super(x, y);
        this.vx = vx;
        this.vy = vy;
        this.char = '*';
        this.damage = 2;
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;
    }

    draw(ctx, cameraX, cameraY) {
        ctx.fillStyle = 'black';
        ctx.font = '15px Monospace';
        ctx.fillText(this.char, this.x - cameraX, this.y - cameraY);
    }
}