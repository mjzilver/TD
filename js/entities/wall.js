import { Building } from './building.js';

export class Wall extends Building {
    constructor(x, y) {
        super(x, y, 'W');
        this.hp = 5;

        this.connections = {
            north: false,
            east: false,
            south: false,
            west: false
        };

        this.connectionPoints = {
            north: { x: 0, y: -1 },
            east: { x: 1, y: 0 },
            south: { x: 0, y: 1 },
            west: { x: -1, y: 0 }
        };
    }

    getRenderData() {
        // check the connections and return the correct image
        // vertical and horizontal walls go first       
        if (this.connections.north && this.connections.south) {
            return 'vertical-wall';
        } else if (this.connections.east && this.connections.west) {
            return 'horizontal-wall';
        }

        // corners
        if (this.connections.north && this.connections.east) {
            return 'corner-wall-top-right';
        } else if (this.connections.north && this.connections.west) {
            return 'corner-wall-top-left';
        } else if (this.connections.south && this.connections.east) {
            return 'corner-wall-bottom-right';
        } else if (this.connections.south && this.connections.west) {
            return 'corner-wall-bottom-left';
        }

        // only one connection
        if (this.connections.north) {
            return 'wall-north';
        } else if (this.connections.east) {
            return 'wall-east';
        } else if (this.connections.south) {
            return 'wall-south';
        } else if (this.connections.west) {
            return 'wall-west';
        }

        // no connections
        return 'wall';

    }
}