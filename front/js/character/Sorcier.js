import { Character } from "./Character.js";
export class Sorcier extends Character {
    constructor(name, lvl = 1) {
        //Level has  default value of 1
        super(name, lvl);
    }
}
