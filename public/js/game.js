import { Base } from './entities/base.js';
import { Tower } from './entities/tower.js';
import { Wall } from './entities/wall.js';
import { Monster } from './entities/monster.js';
import { Arrow } from './entities/arrow.js';
import { Particle } from './entities/particle.js';

import { render } from './renderer.js';
import { findPath } from './pathfinding.js';
import { outOfBoundsCheck } from './utils.js';
import { MonsterSpawner } from './monster-spawner.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const tileSize = 32;
const mapWidth = 20;
const mapHeight = 20;

// fps controls
const FPS_MONSTERS = 2;
const FPS_ARROWS = 20;
const FRAME_DURATION_MONSTERS = 1000 / FPS_MONSTERS;
const FRAME_DURATION_ARROWS = 1000 / FPS_ARROWS;
let lastUpdateTimeMonsters = 0;
let lastUpdateTimeArrows = 0;

let isGameOver = false;

let gameTicks = 0;

let cameraX = 0;
let cameraY = 0;

let monsterSpawner = new MonsterSpawner(mapWidth, mapHeight);

const entities = {
    base: new Base(mapWidth / 2, mapHeight / 2),
    towers: [],
    walls: [],
    monsters: [],
    arrows: [],
    particles: []
};

function gameLoop() {
    const currentTime = Date.now();
    const deltaTime = currentTime - lastUpdateTimeMonsters;

    if (deltaTime >= FRAME_DURATION_MONSTERS && !isGameOver) {
        updateMonsters();
        lastUpdateTimeMonsters = currentTime;
    }

    const deltaTimeArrows = currentTime - lastUpdateTimeArrows;
    if (deltaTimeArrows >= FRAME_DURATION_ARROWS) {
        updateArrows();
        updateParticles();
        monsterSpawner.spawn(entities.monsters, gameTicks);
        lastUpdateTimeArrows = currentTime;
        gameTicks++;
    }

    checkCollisions();
    render(ctx, entities, cameraX, cameraY, tileSize, mapWidth, mapHeight);
    requestAnimationFrame(gameLoop);

    if (isGameOver) {
        ctx.fillStyle = 'black';
        ctx.font = '48px Monospace';
        ctx.fillText('Game Over', canvas.width * 0.25, canvas.height * 0.25);
    } 

    // draw ticks for debugging
    ctx.fillStyle = 'black';
    ctx.font = '12px Monospace';
    ctx.fillText(`Ticks: ${gameTicks}`, 10, 20);
}

function updateMonsters() {
    entities.monsters.forEach(monster => {
        const path = findPath(monster.x, monster.y, entities.base.x, entities.base.y, mapWidth, mapHeight, getBuildingAtPosition, monster);

        monster.setPath(path);

        if (path.length > 1) {
            const nextPosition = path[1];
            let building = getBuildingAtPosition(nextPosition.x, nextPosition.y);

            let monsterAt = entities.monsters.find(m => m.x === nextPosition.x && m.y === nextPosition.y);

            if (monsterAt) {
                // combine
                monster.hp += monsterAt.hp;
                monster.damage += monsterAt.damage;
                // delete old monster
                entities.monsters = entities.monsters.filter(m => m !== monsterAt);
            }
            

            if (building) {
                monster.attack(building);
                if (building.hp <= 0) {
                    destroyBuilding(building);
                }
            } else {
                monster.moveTo(nextPosition.x, nextPosition.y);
            }
        }
    });
}

function updateArrows() {
    entities.towers.forEach(tower => {
        if (!tower.canShoot(gameTicks))
            return;

        const monster = entities.monsters.find(monster => {
            return Math.abs(monster.x - tower.x) <= tower.range && Math.abs(monster.y - tower.y) <= tower.range;
        });

        if (monster) {
            const monsterPath = monster.getPath();
            // how many steps ahead to shoot
            const stepsAhead = 2;
            let monsterNextPosition = { x: monster.x, y: monster.y };
            if (monsterPath.length > stepsAhead)
                monsterNextPosition = monsterPath[stepsAhead];

            const dx = monsterNextPosition.x - tower.x;
            const dy = monsterNextPosition.y - tower.y;
            const length = Math.sqrt(dx * dx + dy * dy);
            const speed = tileSize / 4;

            const vx = (dx / length) * speed;
            const vy = (dy / length) * speed;

            const towerMiddleX = (tower.x * tileSize);
            const towerMiddleY = (tower.y * tileSize) + tileSize;

            entities.arrows.push(new Arrow(
                towerMiddleX,
                towerMiddleY,
                vx, vy));

            tower.lastShot = gameTicks;
        }
    });

    entities.arrows.forEach(arrow => {
        arrow.move();

        // remove out of bounds arrows
        if (outOfBoundsCheck(arrow.x, arrow.y, mapWidth * tileSize, mapHeight * tileSize)) {
            entities.arrows = entities.arrows.filter(a => a !== arrow);
        }
    });
}

function updateParticles() {
    entities.particles.forEach(particle => {
        particle.move();

        if (!particle.isAlive(gameTicks)) {
            entities.particles = entities.particles.filter(p => p !== particle);
        }
    });
}

function getBuildingAtPosition(x, y) {
    if (entities.base.x === x && entities.base.y === y) {
        return entities.base;
    }

    const wall = entities.walls.find(wall => wall.x === x && wall.y === y);
    if (wall) {
        return wall;
    }

    const tower = entities.towers.find(tower => tower.x === x && tower.y === y);
    if (tower) {
        return tower;
    }

    return null;
}

function isPositionOccupied(x, y) {
    return getBuildingAtPosition(x, y) !== null || entities.monsters.some(monster => monster.x === x && monster.y === y) || outOfBoundsCheck(x, y, mapWidth, mapHeight);
}

function destroyBuilding(building) {
    if (building instanceof Wall) {
        entities.walls = entities.walls.filter(wall => wall !== building);
        createParticlesAtTile(20, building.x, building.y, "black");
    } else if (building instanceof Tower) {
        entities.towers = entities.towers.filter(tower => tower !== building);
        createParticlesAtTile(30, building.x, building.y, "black");
    } else if (building instanceof Base) {
        createParticlesAtTile(100, building.x, building.y, "black", 100);
        isGameOver = true;
    }
}

function createParticlesAtTile(amount, tileX, tileY, color = "red", aliveForTicks = 25) {
    const x = tileX * tileSize + tileSize / 2;
    const y = tileY * tileSize + tileSize / 2;

    for (let i = 0; i < amount; i++) {
        let randomVelocityX = Math.random() * 2 - 1;
        let randomVelocityY = Math.random() * 2 - 1;

        entities.particles.push(new Particle(x, y, randomVelocityX, randomVelocityY, gameTicks, color, aliveForTicks));
    }
}

function checkCollisions() {
    entities.arrows.forEach(arrow => {
        entities.monsters.forEach(monster => {
            const distance = Math.sqrt((arrow.x - monster.x * tileSize) ** 2 + (arrow.y - monster.y * tileSize) ** 2);
            if (distance < tileSize) {
                entities.arrows = entities.arrows.filter(a => a !== arrow);

                monster.hp -= arrow.damage;
                createParticlesAtTile(5, monster.x, monster.y, "red");

                if (monster.hp <= 0) {
                    createParticlesAtTile(20, monster.x, monster.y, "red");

                    entities.monsters = entities.monsters.filter(m => m !== monster);
                }
            }
        });
    });
}

window.addEventListener('click', function (event) {
    const x = Math.floor((event.clientX + cameraX) / tileSize);
    const y = Math.floor((event.clientY + cameraY) / tileSize);

    if (isPositionOccupied(x, y)) {
        const wallIndex = entities.walls.findIndex(wall => wall.x === x && wall.y === y);
        const towerIndex = entities.towers.findIndex(tower => tower.x === x && tower.y === y);

        let isShiftPressed = event.shiftKey;
        if (isShiftPressed) {
            // remove whatever is at the position
            if (wallIndex !== -1) {
                entities.walls.splice(wallIndex, 1);
            } else if (towerIndex !== -1) {
                entities.towers.splice(towerIndex, 1);
            }
        }
    } else {
        let isCtrlPressed = event.ctrlKey;
        if (isCtrlPressed) {
            entities.towers.push(new Tower(x, y));
        } else {
            entities.walls.push(new Wall(x, y, 'W'));
        }
    }
});

window.addEventListener('keydown', function (event) {
    const moveAmount = 10;
    switch (event.key) {
        case 'ArrowUp':
            cameraY -= moveAmount;
            break;
        case 'ArrowDown':
            cameraY += moveAmount;
            break;
        case 'ArrowLeft':
            cameraX -= moveAmount;
            break;
        case 'ArrowRight':
            cameraX += moveAmount;
            break;
        case 'm':
            entities.monsters.push(new Monster(0, 0));
            break;
    }
});

gameLoop();
