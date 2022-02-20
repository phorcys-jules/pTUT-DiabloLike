import { Character } from "../character/Character.js";
declare class Game {
    private canvasEl;
    private context;
    private width;
    private height;
    private mobImage;
    private hero;
    private char;
    /**
     * Deltas en ms depuis le dernier refresh
     */
    private timeSinceLastFPS;
    private frame;
    /**
     * Touches sur lesquelles on peut rester appuyé
     * key : name key down,
     * value : isDown ?
     */
    private keyStates;
    constructor(canvasEl: HTMLCanvasElement, hero: Character, char?: Character[]);
    init(this: any): EventListenerOrEventListenerObject;
    /**
     * setup some action as key Mapping
     */
    private setup;
    isKeyDown(key: string): boolean;
    isAnyKeyDown(): boolean;
    run(): Promise<void>;
    /**
     * Appeler a chaque update du jeu
     * @param delta tmps depuis dernier appel
     */
    private loop;
    switchPerso(): void;
}
export default Game;
