import { GameEntity } from './game-entity.js';

export class Arrow extends GameEntity {
    constructor(x, y, vx, vy, damage = 2) {
        super(x, y);
        this.vx = vx;
        this.vy = vy;
        this.char = '*';
        this.damage = damage;
        this.size = 15;
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;
    }

    draw(ctx, cameraX, cameraY) {
        ctx.fillStyle = 'black';
        ctx.font = `${this.size}px Monospace`;	
        ctx.fillText(this.char, this.x - cameraX, this.y - cameraY);
    }
}