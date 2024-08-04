export class GameEntity {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.char = 'G';
        this.hp = 0;
    }

    draw(ctx, cameraX, cameraY, tileSize) {
        let color = this.calculateColor();

        ctx.fillStyle = color;
        ctx.font = `${tileSize}px Monospace`;
        ctx.fillText(this.char, (this.x * tileSize) - cameraX, (this.y * tileSize) - cameraY + tileSize);

        if (this.hp > 0) {
            ctx.fillStyle = 'green';
            ctx.font = `${tileSize / 2}px Monospace`;
            ctx.fillText(this.hp, (this.x * tileSize) - cameraX + tileSize - 15, (this.y * tileSize) - cameraY + 10);
        }
    }

    calculateColor() {
        if (this.hp <= 0) {
            return 'black'; // Dead or invalid
        } else if (this.hp <= 10) {
            return 'grey';  // Poor
        } else if (this.hp <= 20) {
            return 'black'; // Common
        } else if (this.hp <= 30) {
            return 'green'; // Uncommon
        } else if (this.hp <= 40) {
            return 'blue';  // Rare
        } else if (this.hp <= 50) {
            return 'purple'; // Epic
        } else if (this.hp <= 70) {
            return 'orange'; // Legendary
        } else if (this.hp > 70) {
            return 'gold'; // Artifact
        }
    }    
}