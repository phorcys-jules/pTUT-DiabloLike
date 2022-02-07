export declare class Block {
    blockX: number;
    blockY: number;
    width: number;
    height: number;
    solid: boolean;
    img: HTMLImageElement;
    dx: number;
    dy: number;
    dw: number;
    dh: number;
    static FLOOR: number[][];
    static STAIR_UR: number[];
    /**
     * UP left --- UP --- Up Right --- Down Right --- Right Side --- Down left --- Left Side
     */
    static WALL: number[][];
    static CHEST: number[];
    constructor(p_blockX: number, p_blockY: number, p_width: number, p_height: number, p_solid: boolean, p_img: string, dx?: number, dy?: number, dw?: number, dh?: number);
    getBlockX(): number;
    getBlockY(): number;
    getWidth(): number;
    getHeight(): number;
    getSolid(): boolean;
    getImg(): Promise<HTMLImageElement>;
    /**
     * @returns a floor tile of 64*64 so 4 16*16
     */
    getFloor(): Promise<HTMLImageElement>;
    setBlockX(p_blockX: number): void;
    setBlockY(p_blockY: number): void;
    setWidth(p_width: number): void;
    setHeight(p_height: number): void;
    setsolid(p_solid: boolean): void;
    setImg(p_img: string): Promise<void>;
    getURX(): number;
    getURY(): number;
    getDRX(): number;
    getDRY(): number;
    getDLX(): number;
    getDLY(): number;
    getULX(): number;
    getULY(): number;
}
