export class TileImage {
    constructor(name, src) {
        this.name = name;
        this.image = new Image(24, 24);
        this.image.src = src;

        // Ensure the image is fully loaded before use
        this.image.onload = () => {
            console.log(`${this.name} image loaded successfully.`);
            // Image is now loaded and ready to use
        };

        this.image.onerror = (error) => {
            console.error(`Error loading ${this.name} image:`, error);
            // Handle the error if the image fails to load
        };
    }
}
