import GameLoop from "./GameLoop.js";
import { Entity } from "../character/Entity.js";
import { User } from "../User.js";
import { Stuff } from "../character/stuff/Stuff.js";
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
    private cooldown;
    /**
     * Touches sur lesquelles on peut rester appuyé
     * key : name key down,
     * value : isDown ?
     */
    private keyStates;
    static gameLoop: GameLoop;
    static stuff: Stuff;
    constructor(canvasEl: HTMLCanvasElement, player: User, mob?: Entity[]);
    init(this: any): EventListenerOrEventListenerObject;
    /**
     * setup some action as key Mapping
     */
    private setup;
    isKeyDown(key: string): boolean;
    isAnyKeyDown(): boolean;
    run(): Promise<void>;
    static stop(): Promise<void>;
    pauseGame(): void;
    displayStuff(): Promise<void>;
    /**
     * Appeler a chaque update du jeu
     * @param delta tmps depuis dernier appel
     */
    loop(delta: number): Promise<void>;
    switchPerso(): void;
    majDivSpell(): void;
    /**
     * met a jour l'image de la div de sort (en bas à droite de l'interface)
     * @param p_spellImg image du sort
     * @param p_rgbaBackColor couleur de fond utilisant la méhode rgba()
     */
    majSpellImg(p_spellImg: string[], p_rgbaBackColor?: string): void;
}
export default Game;
