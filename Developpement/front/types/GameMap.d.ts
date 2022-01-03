declare class GameMap {
    /**
     * Texture de la case
     */
    private tileImage;
<<<<<<< Updated upstream
    private borderImage;
    private wallImage;
    private width;
    private height;
    constructor(tileImage: HTMLImageElement, borderImage: HTMLImageElement, wallImage: HTMLImageElement, width: number, height: number);
=======
    private wallImage;
    private width;
    private height;
    constructor(tileImage: HTMLImageElement, wallImage: HTMLImageElement, width: number, height: number);
>>>>>>> Stashed changes
    /**
     * Redessinne la carte
     * @param context objet html ou dessiner : Canva 2D
     */
    render(context: CanvasRenderingContext2D): void;
}
export default GameMap;
