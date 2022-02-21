import { Entity } from "./Entity.js";
export declare class Zombie extends Entity {
    /**
     * Temps en ms depuis la dernière action : attaque, changement de direction,...
     */
    timeSinceLastAction: number;
    static isActive: boolean;
    constructor();
    evolve(delta: number): void;
    protected loadSprites(): Promise<void>;
}
