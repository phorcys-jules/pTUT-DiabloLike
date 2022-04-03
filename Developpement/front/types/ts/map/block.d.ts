import { GameImage } from "./GameImage.js";
export declare class Block {
    blockX: number;
    blockY: number;
    width: number;
    height: number;
    solid: boolean;
    img: GameImage[];
    dx: number;
    dy: number;
    dw: number;
    dh: number;
    static FLOOR: number[][];
    static STAIR_UR: number[];
    static STAIR_DL: number[];
    static WALL_U_D: number[];
    static WALL_L: number[];
    static WALL_R: number[];
    static WALL_UR: number[];
    static WALL_UL: number[];
    static WALL_DR: number[];
    static WALL_DL: number[];
    static CHEST: number[];
    static VOID: number[];
    constructor(p_blockX: number, p_blockY: number, p_width: number, p_height: number, p_solid: boolean, p_img: GameImage[]);
    getBlockX(): number;
    getBlockY(): number;
    getWidth(): number;
    getHeight(): number;
    getSolid(): boolean;
    /**
     * @returns a random floor tile of 64*64 so 4 16*16
     */
    getFloor(): Promise<HTMLImageElement>;
    setBlockX(p_blockX: number): void;
    setBlockY(p_blockY: number): void;
    setWidth(p_width: number): void;
    setHeight(p_height: number): void;
    setsolid(p_solid: boolean): void;
    getURX(): number;
    getURY(): number;
    getDRX(): number;
    getDRY(): number;
    getDLX(): number;
    getDLY(): number;
    getULX(): number;
    getULY(): number;
    collisionJoueur(): void;
}
