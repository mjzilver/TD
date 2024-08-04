import { BombTower } from "./entities/bomb-tower.js";
import { Bomb } from "./entities/bomb.js";
import { Boss } from "./entities/boss.js";
import { TileImage } from "./entities/tile-image.js";

// load the images
const tiles = {
    'tower': new TileImage("tower", "tiles/tower.png"),
    'bombTower': new TileImage("bombTower", "tiles/bomb-tower.png"),
    'monster': new TileImage("monster", "tiles/enemy.png"),
    'ground': new TileImage("ground", "tiles/grass.png"),
    'base': new TileImage("base", "tiles/base.png"),
    'bomb': new TileImage("bomb", "tiles/bomb.png"),
    'boss': new TileImage("boss", "tiles/boss.png"),
    'wall': new TileImage("wall", "tiles/wall.png"),
    'horizontal-wall': new TileImage("horizontal-wall", "tiles/horizontal-wall.png"),
    'vertical-wall': new TileImage("vertical-wall", "tiles/vertical-wall.png"),
    'corner-wall-top-right': new TileImage("corner-wall-top-right", "tiles/corner-wall-top-right.png"),
    'corner-wall-top-left': new TileImage("corner-wall-top-left", "tiles/corner-wall-top-left.png"),
    'corner-wall-bottom-right': new TileImage("corner-wall-bottom-right", "tiles/corner-wall-bottom-right.png"),
    'corner-wall-bottom-left': new TileImage("corner-wall-bottom-left", "tiles/corner-wall-bottom-left.png"),
    'wall-north': new TileImage("wall-north", "tiles/wall-north.png"),
    'wall-east': new TileImage("wall-east", "tiles/wall-east.png"),
    'wall-south': new TileImage("wall-south", "tiles/wall-south.png"),
    'wall-west': new TileImage("wall-west", "tiles/wall-west.png"),
    'asterisk': new TileImage("asterisk", "tiles/asterisk.png"),
};


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
                //ctx.strokeRect(screenX, screenY, tileSize, tileSize);
                ctx.drawImage(tiles.ground.image, screenX, screenY, tileSize, tileSize);
            }
        }
    }
}

function drawEntities(ctx, entities, cameraX, cameraY, tileSize) {
    // set font for entities
    ctx.font = `${tileSize}px Monospace`;

    drawTile(ctx, 'base', entities.base.x, entities.base.y, tileSize);

    entities.towers.forEach(tower => { 
        if (tower instanceof BombTower) {
            drawTile(ctx, 'bombTower', tower.x, tower.y, tileSize);
        } else {
            drawTile(ctx, 'tower', tower.x, tower.y, tileSize);
        }
    });

    entities.walls.forEach(wall => {
        drawTile(ctx, wall.getRenderData(), wall.x, wall.y, tileSize);
    });

    entities.monsters.forEach(monster => {
        if (monster instanceof Boss) {
            drawTile(ctx, 'boss', monster.x, monster.y, tileSize);
        } else {
            drawTile(ctx, 'monster', monster.x, monster.y, tileSize);
        }
    });	
    entities.arrows.forEach(arrow => {
        if (arrow instanceof Bomb) {
            ctx.drawImage(tiles.bomb.image, 
                arrow.x - cameraX - tileSize / 4,
                arrow.y - cameraY - tileSize / 4,
                tileSize / 2, 
                tileSize / 2);
        } else {
            arrow.draw(ctx, cameraX, cameraY);
        }
    });
    entities.particles.forEach(particle => particle.draw(ctx, cameraX, cameraY));
}

function drawTile(ctx, tile, x, y, tileSize) {
    ctx.drawImage(tiles[tile].image, x * tileSize, y * tileSize, tileSize, tileSize);
}
