import { Character } from "./Character.js";
export class Archer extends Character {
    constructor(name, lvl = 1) {
        //Level has  default value of 1
        super(name, lvl);
    }
}