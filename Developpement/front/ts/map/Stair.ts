import GameMap from "../engine/GameMap.js";
import { Block } from "./Block.js";

export class Stair extends Block {

    public collisionJoueur(){
        console.log("Je suis un escalier");
        GameMap.nextFloor();
    }
}