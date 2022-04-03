import { Entity } from "./Entity.js";
export declare abstract class Character extends Entity {
    spellImg: string[];
    constructor(name?: string, lvl?: number, speed?: number, strenth?: number, attackSpeed?: number, maxHp?: number, maxMp?: number, x?: number, y?: number, spellImg?: string[]);
    /**
     * Déplace le perso dans la dir associé
     * @param direction
     * 1 : N,
     * 2 : S,
     * 3 : E,
     * 4 : O
     * @param delta : temps depuis la dernière boucle : anti-lag
     */
    walk(direction: number, delta: number, mob: Entity[]): void;
    addHp(amount: number): number;
}
