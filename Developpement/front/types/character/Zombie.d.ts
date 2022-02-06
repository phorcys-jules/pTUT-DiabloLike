import { Character } from "./Character";
export declare class Zombie extends Character {
    /**
     * Temps en ms depuis la dernière action : attaque, changement de direction,...
     */
    timeSinceLastAction: number;
    constructor();
    evolve(delta: number): void;
    protected loadSprites(): Promise<void>;
}
