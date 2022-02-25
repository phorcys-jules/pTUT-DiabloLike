import { Character } from "./Character.js";
export declare class Warrior extends Character {
    swordImage: any;
    constructor(name?: string, lvl?: number, speed?: number, strenth?: number, maxHp?: number, maxMp?: number, x?: number, y?: number);
    protected loadSprites(): Promise<void>;
    attack(): number;
}
