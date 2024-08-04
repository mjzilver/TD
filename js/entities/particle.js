import { GameEntity } from './game-entity.js';

export class Particle extends GameEntity {
    constructor(x, y, vx, vy, currentTicks, color, aliveForTicks = 25) {
        super(x, y);
        this.vx = vx;
        this.vy = vy;
        this.char = '.';
        this.color = color;
        this.aliveForTicks = aliveForTicks;
        this.createdAt = currentTicks;
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;
    }

    isAlive(currentTicks) {
        return currentTicks - this.createdAt < this.aliveForTicks;
    }

    draw(ctx, cameraX, cameraY) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - cameraX, this.y - cameraY, 2, 2);
    }
}