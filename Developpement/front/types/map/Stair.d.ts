import { GameImage } from "./GameImage.js";
import { Block } from "./Block.js";
import { Entity } from "../character/Entity.js";
export declare class Stair extends Block {
    private orientation;
    constructor(p_blockX: number, p_blockY: number, p_width: number, p_height: number, p_solid: boolean, p_img: GameImage[], p_orientation: string);
    collisionJoueur(p_entity: Entity): void;
}
