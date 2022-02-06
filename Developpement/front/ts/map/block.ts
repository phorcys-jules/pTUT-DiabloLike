class Block {

    private blockX: number; 
    private blockY: number;
    private width: number;
    private height: number;
    private solid: boolean;
    private img: HTMLImageElement;

    constructor(p_blockX: number, p_blockY: number, p_width: number, p_height: number, p_solid: boolean, p_img: HTMLImageElement) {
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
    public getImg():HTMLImageElement{
        return this.img;
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
    public setImg(p_img:HTMLImageElement){
        this.img = p_img;
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