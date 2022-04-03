import { Entity } from "../character/Entity.js";
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
    public static STAIR_DL : number[] = [0,288,16,15];

    public static WALL_U_D : number[] = [48,16,64,32];
    public static WALL_L : number[] = [7,32,16,15];
    public static WALL_R : number[] = [25,32,16,15];
    public static WALL_UR : number[] = [24,0,17,31];
    public static WALL_UL : number[] = [7,0,17,31];
    public static WALL_DR : number[] = [24,48,17,31];
    public static WALL_DL : number[] = [7,48,17,31];


    public static CHEST : number[] = [96,272,16,16];
    public static VOID : number[] = [0,0,0,0];



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

    public collisionJoueur(p_entity: Entity){};
}