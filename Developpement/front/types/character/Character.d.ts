import { Entity } from "./Entity.js";
export declare abstract class Character extends Entity {
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
