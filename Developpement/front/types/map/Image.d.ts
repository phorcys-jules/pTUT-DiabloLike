export declare class Image {
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
    constructor(p_X: number, p_Y: number, p_width: number, p_height: number, p_solid: boolean, p_img: string, dx?: number, dy?: number, dw?: number, dh?: number);
    getImg(): Promise<HTMLImageElement>;
    setImg(p_img: string): Promise<void>;
}
