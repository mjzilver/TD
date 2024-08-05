import { BombTower } from "./entities/bomb-tower.js";
import { Bomb } from "./entities/bomb.js";
import { Boss } from "./entities/boss.js";
import { TileImage } from "./entities/tile-image.js";

// load the images with optional rotation
const tiles = {
    'tower': new TileImage("tiles/tower.png"),
    'bombTower': new TileImage("tiles/bomb-tower.png"),
    'monster': new TileImage("tiles/enemy.png"),
    'ground': new TileImage("tiles/grass.png"),

    'base': new TileImage("tiles/base.png"),
    'bomb': new TileImage("tiles/bomb.png"),
    'boss': new TileImage("tiles/boss.png"),
    'asterisk': new TileImage("tiles/asterisk.png"),

    /// TERRAIN
    'grass': new TileImage("tiles/grass.png"),
    'rock': new TileImage("tiles/rock.png"),
    'sand': new TileImage("tiles/sand.png"),
    // connection/transitions
    'sand-grass-top': new TileImage("tiles/sand-grass-top.png", 0),
    'sand-grass-right': new TileImage("tiles/sand-grass-right.png", 0),
    'sand-grass-bottom': new TileImage("tiles/sand-grass-top.png", 180),
    'sand-grass-left': new TileImage("tiles/sand-grass-right.png", 180),
    // corners
    'sand-grass-top-left': new TileImage("tiles/sand-grass-top-left.png", 0),
    'sand-grass-top-right': new TileImage("tiles/sand-grass-top-left.png", 90),
    'sand-grass-bottom-right': new TileImage("tiles/sand-grass-top-left.png", 180),
    'sand-grass-bottom-left': new TileImage("tiles/sand-grass-top-left.png", 270),

    /// WALLS
    'wall': new TileImage("tiles/wall.png"),
    // two sided connections
    'horizontal-wall': new TileImage("tiles/horizontal-wall.png"),
    'vertical-wall': new TileImage("tiles/vertical-wall.png"),
    // corners
    'corner-wall-top-left': new TileImage("tiles/corner-wall-top-left.png", 0),
    'corner-wall-top-right': new TileImage("tiles/corner-wall-top-left.png", 90),
    'corner-wall-bottom-right': new TileImage("tiles/corner-wall-top-left.png", 180),
    'corner-wall-bottom-left': new TileImage("tiles/corner-wall-top-left.png", 270),

    // one sided connections
    'wall-north': new TileImage("tiles/wall-north.png", 0),
    'wall-east': new TileImage("tiles/wall-north.png", 90),
    'wall-south': new TileImage("tiles/wall-north.png", 180),
    'wall-west': new TileImage("tiles/wall-north.png", 270),
};

export function render(ctx, entities, cameraX, cameraY, tileSize, mapWidth, mapHeight) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawMap(ctx, entities, cameraX, cameraY, tileSize, mapWidth, mapHeight);
    drawEntities(ctx, entities, cameraX, cameraY, tileSize);
}

function drawMap(ctx, entities, cameraX, cameraY, tileSize, mapWidth, mapHeight) {
    ctx.strokeStyle = 'gray';
    for (let y = 0; y < mapHeight; y++) {
        for (let x = 0; x < mapWidth; x++) {
            const screenX = (x * tileSize) - cameraX;
            const screenY = (y * tileSize) - cameraY;

            if (screenX + tileSize > 0 && screenX < ctx.canvas.width && screenY + tileSize > 0 && screenY < ctx.canvas.height) {
                //ctx.strokeRect(screenX, screenY, tileSize, tileSize);
                var terrainTile = entities.terrain[x][y];
                var tile = tiles[terrainTile];
                drawRotatedTile(ctx, tile, screenX, screenY, tileSize);
            }
        }
    }
}

function drawEntities(ctx, entities, cameraX, cameraY, tileSize) {
    // set font for entities
    ctx.font = `${tileSize}px Monospace`;

    drawTile(ctx, tiles['base'], entities.base.x, entities.base.y, tileSize);

    entities.towers.forEach(tower => { 
        if (tower instanceof BombTower) {
            drawTile(ctx, tiles['bombTower'], tower.x, tower.y, tileSize);
        } else {
            drawTile(ctx, tiles['tower'], tower.x, tower.y, tileSize);
        }
    });

    entities.walls.forEach(wall => {
        drawTile(ctx, tiles[wall.getRenderData()], wall.x, wall.y, tileSize);
    });

    entities.monsters.forEach(monster => {
        if (monster instanceof Boss) {
            drawTile(ctx, tiles['boss'], monster.x, monster.y, tileSize);
        } else {
            drawTile(ctx, tiles['monster'], monster.x, monster.y, tileSize);
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
    drawRotatedTile(ctx, tile, x * tileSize, y * tileSize, tileSize);
}

function drawRotatedTile(ctx, tile, x, y, tileSize) {
    if (tile.rotate) {
        ctx.save();
        ctx.translate(x + tileSize / 2, y + tileSize / 2);
        ctx.rotate(tile.rotate * Math.PI / 180);
        ctx.drawImage(tile.image, -tileSize / 2, -tileSize / 2, tileSize, tileSize);
        ctx.restore();
    } else {
        ctx.drawImage(tile.image, x, y, tileSize, tileSize);
    }
}
