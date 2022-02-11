import ImageUtils from "../engine/ImageUtils.js";

export class GameImage {

    public X: number;
    public Y: number;
    public width: number;
    public height: number;
    public solid: boolean;
    public img: HTMLImageElement;

    public dx: number;
    public dy: number;
    public dw: number;
    public dh: number



    constructor(p_X: number=0, p_Y: number=0, p_width: number=0, p_height: number=0, p_img: string, dx: number = 0, dy: number = 0, dw: number = 64, dh: number = 64) {
        this.X = p_X;
        this.Y = p_Y;
        this.width = p_width;
        this.height = p_height;
        this.dx = dx;
        this.dy = dy;
        this.dw = dw;
        this.dh = dh;
        this.setImg(p_img);
    }

    public async getImg(): Promise<HTMLImageElement> {
        return this.img;
    }
    public async setImg(p_img: string) {
        this.img = await ImageUtils.loadImageFromUrl(p_img);
    }






}