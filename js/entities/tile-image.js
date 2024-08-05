export class TileImage {
    constructor(src, rotate = 0) {
        this.image = new Image(24, 24);
        this.image.src = src;
        this.rotate = rotate;

        this.image.onerror = (error) => {
            console.error(`Error loading ${this.src} image:`, error);
            // Handle the error if the image fails to load
        };
    }
}
