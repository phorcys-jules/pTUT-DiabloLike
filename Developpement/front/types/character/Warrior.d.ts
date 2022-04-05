import { Character } from "./Character.js";
export declare class Warrior extends Character {
    swordImage: any;
    constructor(name?: string, lvl?: number, speed?: number, strenth?: number, attackSpeed?: number, maxHp?: number, maxMp?: number, hp?: number, mp?: number, x?: number, y?: number, spellImg?: string[]);
    protected loadSprites(): Promise<void>;
    attack(): number;
}
