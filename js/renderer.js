export function render(ctx, entities, cameraX, cameraY, tileSize, mapWidth, mapHeight) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawMap(ctx, cameraX, cameraY, tileSize, mapWidth, mapHeight);
    drawEntities(ctx, entities, cameraX, cameraY, tileSize);
}

function drawMap(ctx, cameraX, cameraY, tileSize, mapWidth, mapHeight) {
    ctx.strokeStyle = 'gray';
    for (let y = 0; y < mapHeight; y++) {
        for (let x = 0; x < mapWidth; x++) {
            const screenX = (x * tileSize) - cameraX;
            const screenY = (y * tileSize) - cameraY;

            if (screenX + tileSize > 0 && screenX < ctx.canvas.width && screenY + tileSize > 0 && screenY < ctx.canvas.height) {
                ctx.strokeRect(screenX, screenY, tileSize, tileSize);
            }
        }
    }
}

function drawEntities(ctx, entities, cameraX, cameraY, tileSize) {
    // set font for entities
    ctx.font = `${tileSize}px Monospace`;
    entities.base.draw(ctx, cameraX, cameraY, tileSize);
    entities.towers.forEach(tower => tower.draw(ctx, cameraX, cameraY, tileSize));
    entities.walls.forEach(wall => wall.draw(ctx, cameraX, cameraY, tileSize));
    entities.monsters.forEach(monster => monster.draw(ctx, cameraX, cameraY, tileSize));
    entities.arrows.forEach(arrow => arrow.draw(ctx, cameraX, cameraY));
    entities.particles.forEach(particle => particle.draw(ctx, cameraX, cameraY));
}
