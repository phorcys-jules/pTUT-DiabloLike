import { GameImage } from "./GameImage.js";
import GameMap from "../engine/GameMap.js";
import { Block } from "./Block.js";
import { Entity } from "../character/Entity.js";
import { Archer } from "../character/Archer.js";
import { Warrior } from "../character/Warrior.js";
import { Wizard } from "../character/Wizard.js";

export class Stair extends Block {

    private orientation: string

    constructor(p_blockX: number, p_blockY: number, p_width: number, p_height: number, p_solid: boolean, p_img: GameImage[], p_orientation: string) {
        super(p_blockX, p_blockY, p_width, p_height, p_solid, p_img);
        this.orientation = p_orientation;
    }

    public collisionJoueur(p_entity: Entity) {
        console.log("Je suis un escalier " + this.orientation);
        if (p_entity instanceof Warrior || p_entity instanceof Archer || p_entity instanceof Wizard) {
            if (this.orientation == "up")
                GameMap.nextFloor();
            else {
                GameMap.previousFloor();
            }
        }
    }
}