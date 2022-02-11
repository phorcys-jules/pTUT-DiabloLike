export declare abstract class Character extends Object {
    name: string;
    lvl: number;
    xp: number;
    speed: number;
    strenth: number;
    hp: number;
    maxHp: number;
    mp: number;
    maxMp: number;
    x: number;
    y: number;
    sprites: HTMLImageElement;
    multiSprite: number;
    /**
     * x, y of the current sprite
     */
    currentSprite: number[];
    dir: number;
    movable: boolean[];
    constructor(name?: string, lvl?: number, speed?: number, strenth?: number, maxHp?: number, maxMp?: number, x?: number, y?: number);
    protected loadSprites(): Promise<void>;
    paint(context: CanvasRenderingContext2D): void;
    nextSprites(): void;
    toString(): string;
    evolve(delat: number): void;
    /**
     * Déplace le perso dans la dir associé
     * @param direction
     * 1 : N,
     * 2 : S,
     * 3 : E,
     * 4 : O
     * @param delta : temps depuis la dernière boucle : anti-lag
     */
    walk(direction: number, delta: number): void;
    addXP(amount: number): void;
    addMana(amount: number): void;
    addHp(amount: number): void;
    getBlockPos(y?: number, x?: number): number[];
    isBlockSolid(x: number, y: number): boolean;
}
