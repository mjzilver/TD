export class GameEntity {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.char = 'G';
        this.hp = 0;
    }

    draw(ctx, cameraX, cameraY, tileSize) {
        ctx.fillStyle = 'black';
        ctx.font = `${tileSize}px Monospace`;
        ctx.fillText(this.char, (this.x * tileSize) - cameraX, (this.y * tileSize) - cameraY + tileSize);

        if(this.hp > 0) {
            ctx.fillStyle = 'green';
            ctx.font = '12px Monospace';
            ctx.fillText(this.hp, (this.x * tileSize) - cameraX + tileSize - 15, (this.y * tileSize) - cameraY + 10);
        }
    }
}