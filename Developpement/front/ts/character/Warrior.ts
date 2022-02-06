import { Character } from "./Character";

export class Warrior extends Character {

    constructor(name:string, lvl:number =1) {
        //Level has  default value of 1
        super(name, lvl);
    }
}

