import ImageUtils from "../engine/ImageUtils.js";

export abstract class Character extends Object {

    name: string;
    lvl: number;
    speed: number;

    x: number;
    y: number;
    sprites: HTMLImageElement;
    /**
     * x, y of the current sprite
     */
    currentSprite: number[];



    constructor(name: string, lvl: number = 1, speed: number = 100, x: number = 64, y: number = 64) {
        //Level has  default value of 1
        super();
        this.name = name;
        this.lvl = lvl;
        this.speed=speed;
        this.x = x;
        this.y = y;

        this.loadSprites();
    }

    private async loadSprites() {
        this.sprites = await ImageUtils.loadImageFromUrl("./assets/img/perso/sprites.png");
        this.currentSprite=[0,0];
    }

    paint(context: CanvasRenderingContext2D) {        
        context.drawImage(this.sprites, this.currentSprite[0], this.currentSprite[1],64,64,this.x,this.y,64,64);
    }
    nextSprites() {
        if (this.currentSprite[0]==64) {
            this.currentSprite[0]=0;
        }else{
            this.currentSprite[0]+=64;
        }
    }

    toString() {
        return `${this.name} est un ${this.constructor.name} de niveau ${this.lvl}`
    }

    /**
     * Déplace le perso dans la dir associé
     * @param direction
     * 1 : N,
     * 2 : S,
     * 3 : E,
     * 4 : O
     * @param delta : temps depuis la dernière boucle : anti-lag
     */
    walk(direction: number, delta:number) {
        //TODO if en collision, return -1
        

        switch (direction) {
            case 1:
                this.y -= this.speed*delta;
                this.currentSprite[1]=192;
                break; 
            case 2:
                this.y += this.speed*delta;
                this.currentSprite[1]=0;
                break; 
            case 3:
                this.x += this.speed*delta;
                this.currentSprite[1]=64;
                break; 
            case 4:
                this.x -= this.speed*delta;
                this.currentSprite[1]=128;
                break;
        }
    }
}
