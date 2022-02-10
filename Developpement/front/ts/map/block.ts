import ImageUtils from "../engine/ImageUtils.js";
import { GameImage } from "./GameImage.js";

export class Block {

    public blockX: number; 
    public blockY: number;
    public width: number;
    public height: number;
    public solid: boolean;
    public img: GameImage[];

    public dx: number;
    public dy: number;
    public dw: number;
    public dh: number;


    /* Sprites constants */
                                            //dx, dy, w, h
    public static FLOOR : number[][] = [[80,240,16,16], [96,240,16,16], [112,240,16,16],
                                        [80,256,16,16], [96,256,16,16], [80,256,16,16]];

    public static STAIR_UR : number[] = [32,285,16,19];

    /**
     * UP left --- UP --- Up Right --- Down Right --- Right Side --- Down left --- Left Side
     */
    public static WALL : number[][] = [[7,0,17,31], [48,16,64,32], [24,0,17,31],
    //[24,48,17,31], [75,309,31,32], [7,48,17,31]];
    [24,48,17,31], [71,104,9,7], [7,48,17,31], [112,104,9,7]];

    public static CHEST : number[] = [96,272,16,16];



    constructor(p_blockX: number, p_blockY: number, p_width: number, p_height: number, p_solid: boolean, p_img: GameImage[]) {
        this.blockX = p_blockX;
        this.blockY = p_blockY;
        this.width = p_width;
        this.height = p_height;
        this.solid = p_solid;

        this.img = p_img;
      }

    public getBlockX():number{
        return this.blockX;
    }
    public getBlockY():number{
        return this.blockY;
    }
    public getWidth():number{
        return this.width;
    }
    public getHeight():number{
        return this.height;
    }
    public getSolid():boolean{
        return this.solid;
    }

    /**
     * @returns a random floor tile of 64*64 so 4 16*16
     */
    public async getFloor():Promise<HTMLImageElement>{
        Math.floor(Math.random() * (6 + 1));
        let i = new Image(16, 16);
        i.src = '../../assets/img/map/AssetsDG.png';
        return i;
    }
    public setBlockX(p_blockX:number){
        this.blockX = p_blockX;
    }

    public setBlockY(p_blockY:number){
        this.blockY = p_blockY;
    }
    public setWidth(p_width:number){
        this.width = p_width;
    }
    public setHeight(p_height:number){
        this.height = p_height;
    }
    public setsolid(p_solid:boolean){
        this.solid = p_solid;
    }


    public getURX():number{
        return this.blockX + this.width;
    }
    public getURY():number{
        return this.blockY;
    }
    public getDRX():number{
        return this.blockX + this.width;
    }
    public getDRY():number{
        return this.blockY + this.height;
    }
    public getDLX():number{
        return this.blockX;
    }
    public getDLY():number{
        return this.blockY + this.height;
    }
    public getULX():number{
        return this.blockX;
    }
    public getULY():number{
        return this.blockY;
    }
}