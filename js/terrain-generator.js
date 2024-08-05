import { randomBetween } from "./utils.js";

export class TerrainGenerator {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.terrain = [];
    }

    getTile(x, y) {
        return this.terrain[x][y];
    }

    generate() {
        // set everything as grass
        for (let x = 0; x < this.width; x++) {
            this.terrain[x] = [];
            for (let y = 0; y < this.height; y++) {
                this.terrain[x][y] = TileTypes.grass;
            }
        }

        const randomSpawns = randomBetween(1, 4);

        for (let i = 0; i < randomSpawns; i++) {
            this.spreadFromRandom();
        }
        this.findTransitionTiles();

        return this.terrain;
    }

    spreadFromRandom() {
        // pick random starting point
        const x = randomBetween(0, this.width - 1);
        const y = randomBetween(0, this.height - 1);

        // spread 10-25 times from the starting point converting to sand
        const spreadAmount = randomBetween(10, 25);
        this.spread(x, y, TileTypes.sand, spreadAmount);
    }

    spread(x, y, type, spreadAmount) {
        spreadAmount--;

        if (spreadAmount <= 0) {
            return;
        }

        const directions = [
            { x: 0, y: -1 },
            { x: 0, y: 1 },
            { x: -1, y: 0 },
            { x: 1, y: 0 }
        ];

        // shuffle the directions
        directions.sort(() => Math.random() - 0.5);

        for (let i = 0; i < directions.length; i++) {
            const dir = directions[i];
            const newX = x + dir.x;
            const newY = y + dir.y;

            if (newX < 0 || newX >= this.width || newY < 0 || newY >= this.height) {
                continue;
            }

            if (randomBetween(0, 100) > 10 * spreadAmount) {
                continue;
            }
            if (this.terrain[newX][newY] === TileTypes.grass) {
                this.terrain[newX][newY] = type;
                this.spread(newX, newY, type, spreadAmount);
            }
        }
    }

    findTransitionTiles() {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                if (this.terrain[x][y] === TileTypes.sand) {
                    this.findTransitionTile(x, y);
                }
            }
        }
    }

    findTransitionTile(x, y) {
        const directions = [
            { x: 0, y: -1 }, // top
            { x: 0, y: 1 }, // bottom
            { x: -1, y: 0 }, // left
            { x: 1, y: 0 } // right
        ];

        const surroundings = directions.map(dir => {
            const newX = x + dir.x;
            const newY = y + dir.y;
            if (newX >= 0 && newX < this.width && newY >= 0 && newY < this.height) {
                return this.terrain[newX][newY];
            }
            return null;
        });

        const corners = [
            { x: -1, y: -1 }, // top-left
            { x: 1, y: -1 }, // top-right
            { x: -1, y: 1 }, // bottom-left
            { x: 1, y: 1 } // bottom-right
        ];

        const cornerSurroundings = corners.map(corner => {
            const newX = x + corner.x;
            const newY = y + corner.y;
            if (newX >= 0 && newX < this.width && newY >= 0 && newY < this.height) {
                return this.terrain[newX][newY];
            }
            return null;
        });

        // Assign tile based on surrounding tiles
        if (surroundings[0] === TileTypes.grass && surroundings[2] === TileTypes.grass) {
            this.terrain[x][y] = TileTypes["sand-grass-bottom-right"];
        } else if (surroundings[0] === TileTypes.grass && surroundings[3] === TileTypes.grass) {
            this.terrain[x][y] = TileTypes["sand-grass-bottom-left"];
        } else if (surroundings[1] === TileTypes.grass && surroundings[2] === TileTypes.grass) {
            this.terrain[x][y] = TileTypes["sand-grass-top-right"];
        } else if (surroundings[1] === TileTypes.grass && surroundings[3] === TileTypes.grass) {
            this.terrain[x][y] = TileTypes["sand-grass-top-left"];
        } else if (surroundings[0] === TileTypes.grass) {
            this.terrain[x][y] = TileTypes["sand-grass-bottom"];
        } else if (surroundings[1] === TileTypes.grass) {
            this.terrain[x][y] = TileTypes["sand-grass-top"];
        } else if (surroundings[2] === TileTypes.grass) {
            this.terrain[x][y] = TileTypes["sand-grass-right"];
        } else if (surroundings[3] === TileTypes.grass) {
            this.terrain[x][y] = TileTypes["sand-grass-left"];
        }

        // if left and right are grass, turn into grass
        if (surroundings[2] === TileTypes.grass && surroundings[3] === TileTypes.grass) {
            this.terrain[x][y] = TileTypes.grass;
        }

        // if top and bottom are grass, turn into grass
        if (surroundings[0] === TileTypes.grass && surroundings[1] === TileTypes.grass) {
            this.terrain[x][y] = TileTypes.grass;
        }
    }
}

export const TileTypes = {
    grass: "grass",
    rock: "rock",
    sand: "sand",
    "sand-grass-top": "sand-grass-top",
    "sand-grass-right": "sand-grass-right",
    "sand-grass-bottom": "sand-grass-bottom",
    "sand-grass-left": "sand-grass-left",
    "sand-grass-top-left": "sand-grass-top-left",
    "sand-grass-top-right": "sand-grass-top-right",
    "sand-grass-bottom-left": "sand-grass-bottom-left",
    "sand-grass-bottom-right": "sand-grass-bottom-right"
};
