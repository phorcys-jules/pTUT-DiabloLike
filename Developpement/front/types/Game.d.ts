declare class Game {
    private canvasEl;
    private context;
    private width;
    private height;
    private map;
    private charImage;
    private charX;
    private charY;
    /**
     * key : name key down,
     * value : isDown ?
     */
    private keyStates;
    constructor(canvasEl: HTMLCanvasElement);
    init(this: any): EventListenerOrEventListenerObject;
    /**
     * setup some action as key Mapping
     */
    private setup;
    run(): Promise<void>;
    /**
     * Appeler a chaque update du jeu
     * @param delta tmps depuis dernier appel
     */
    private loop;
}
export default Game;
