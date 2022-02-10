export declare class GameImage {
    X: number;
    Y: number;
    width: number;
    height: number;
    solid: boolean;
    img: HTMLImageElement;
    dx: number;
    dy: number;
    dw: number;
    dh: number;
    constructor(p_X: number | undefined, p_Y: number | undefined, p_width: number | undefined, p_height: number | undefined, p_img: string, dx?: number, dy?: number, dw?: number, dh?: number);
    getImg(): Promise<HTMLImageElement>;
    setImg(p_img: string): Promise<void>;
}
