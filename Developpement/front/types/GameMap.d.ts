declare class GameMap {
    /**
     * Texture de la case
     */
    private tileImage;
    private width;
    private height;
    constructor(tileImage: HTMLImageElement, width: number, height: number);
    /**
     * Redessinne la carte
     * @param context objet html ou dessiner : Canva 2D
     */
    render(context: CanvasRenderingContext2D): void;
}
export default GameMap;
