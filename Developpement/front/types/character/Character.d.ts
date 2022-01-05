export declare abstract class Character extends Object {
    name: string;
    lvl: number;
    speed: number;
    x: number;
    y: number;
    sprites: HTMLImageElement;
    /**
     * x, y of the current sprite
     */
    currentSprite: number[];
    constructor(name: string, lvl?: number, speed?: number, x?: number, y?: number);
    private loadSprites;
    paint(context: CanvasRenderingContext2D): void;
    nextSprites(): void;
    toString(): string;
    /**
     * Déplace le perso dans la dir associé
     * @param direction
     * 1 : N,
     * 2 : S,
     * 3 : E,
     * 4 : O
     */
    walk(direction: number): void;
}
