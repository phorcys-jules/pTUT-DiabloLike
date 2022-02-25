import { Entity } from "../character/Entity.js";
import { User } from "../User.js";
declare class Game {
    private canvasEl;
    static context: CanvasRenderingContext2D;
    private width;
    private height;
    private mobImage;
    static player: User;
    private hero;
    static mob: Entity[];
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
    constructor(canvasEl: HTMLCanvasElement, player: User, mob?: Entity[]);
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
