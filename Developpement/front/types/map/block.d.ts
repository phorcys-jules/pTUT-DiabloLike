declare class Block {
    private blockX;
    private blockY;
    private width;
    private height;
    private solid;
    private img;
    constructor(p_blockX: number, p_blockY: number, p_width: number, p_height: number, p_solid: boolean, p_img: HTMLImageElement);
    getBlockX(): number;
    getBlockY(): number;
    getWidth(): number;
    getHeight(): number;
    getSolid(): boolean;
    getImg(): HTMLImageElement;
    setBlockX(p_blockX: number): void;
    setBlockY(p_blockY: number): void;
    setWidth(p_width: number): void;
    setHeight(p_height: number): void;
    setsolid(p_solid: boolean): void;
    setImg(p_img: HTMLImageElement): void;
    getURX(): number;
    getURY(): number;
    getDRX(): number;
    getDRY(): number;
    getDLX(): number;
    getDLY(): number;
    getULX(): number;
    getULY(): number;
}
