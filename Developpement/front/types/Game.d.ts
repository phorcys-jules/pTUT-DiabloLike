declare class Game {
    private context;
    private width;
    private height;
    private map;
    private charImage;
    private charX;
    private charY;
    constructor(context: CanvasRenderingContext2D, width: number, height: number);
    run(): Promise<void>;
    private loop;
}
export default Game;
