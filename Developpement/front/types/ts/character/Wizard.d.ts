import { Character } from "./Character.js";
import { GameImage } from "../map/GameImage.js";
export declare class Wizard extends Character {
    fireballImage: GameImage;
    constructor(name?: string, lvl?: number, speed?: number, strenth?: number, attackSpeed?: number, maxHp?: number, maxMp?: number, x?: number, y?: number);
    protected loadSprites(): Promise<void>;
    attack(): number;
}
