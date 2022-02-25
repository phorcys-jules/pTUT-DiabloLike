import { Entity } from "./Entity.js";
export declare class Zombie extends Entity {
    /**
     * Temps en ms depuis la dernière action : attaque, changement de direction,...
     */
    timeSinceLastAction: number;
    static isActive: boolean;
    attackSound: HTMLAudioElement;
    constructor(name?: string, lvl?: number, speed?: number, strenth?: number, maxHp?: number, maxMp?: number, x?: number, y?: number);
    evolve(delta: number): void;
    protected loadSprites(): Promise<void>;
}
