declare class GameMap {
    private tileImage;
    private width;
    private height;
    constructor(tileImage: HTMLImageElement, width: number, height: number);
    render(context: CanvasRenderingContext2D): void;
}
export default GameMap;
