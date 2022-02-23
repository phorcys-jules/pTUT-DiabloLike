import Game from "../engine/Game.js";
import ImageUtils from "../engine/ImageUtils.js";
import { Character } from "./Character.js";
import { GameImage } from "../map/GameImage.js";
import GameMap from "../engine/GameMap.js";


export class Wizard extends Character {

    public fireballImage: GameImage;


    constructor(name: string = 'michou', lvl: number = 1, speed: number = 100, strenth: number = 1, maxHp: number = 20, maxMp: number = 20, x: number = 64, y: number = 64) {
        super(name, lvl, speed, strenth, maxHp, maxMp, x, y);
        this.attackSound = new Audio('./assets/sound/entity/fireball_attack.mp3');
        this.fireballImage = new GameImage(this.x, this.y + 16, 32, 32, "./assets/img/capacity/fireball.png")
    }

    protected async loadSprites() {
        this.sprites = await ImageUtils.loadImageFromUrl("./assets/img/perso/wizard_sprites.png");
        this.currentSprite = [0, 0];
    }

    attack(): number {
        this.attackSound.play();
        //this.fireball();
        let sendX = this.x;
        let sendY = this.y;
        let fireImg = this.fireballImage

        GameMap.renderable.push(function feu() {
            fireball(sendX, sendY, fireImg, 64);
        })
        /*
        GameMap.renderable.push(async function fireball(x: number = sendX, y:number = sendY, img:GameImage = fireImg, porte:number = 64){
            console.log("fireeeeeeeeeeeeeeee !", porte)
            //64 : porté du sort
            try {
                //Game.context.drawImage(await i.getImg(), i.dx, i.dy, i.dw, i.dh, (x + i.X) * 64, (y + i.Y) * 64, i.width, i.height);
                Game.context.drawImage(await fireImg.getImg(), x+64-porte, y);
                porte--;
            } catch (error) {
                console.log(error)
            }
            //console.log(porte)
            if (porte === 63) {
                //console.log(GameMap.renderable);
                
                GameMap.renderable.pop();
            }else{}
        });*/
        return this.strenth;
    }


}

async function fireball(x: number , y:number , img:GameImage, porte:number = 64){
    console.log("fireeeeeeeeeeeeeeee !", porte)
    //64 : porté du sort
    try {
        //Game.context.drawImage(await i.getImg(), i.dx, i.dy, i.dw, i.dh, (x + i.X) * 64, (y + i.Y) * 64, i.width, i.height);
        Game.context.drawImage(await img.getImg(), x+64-porte, y);
        porte--;
    } catch (error) {
        console.log(error)
    }
    GameMap.renderable.pop();
    if (porte > 0 ) {
        GameMap.renderable.push(function feu() {
            fireball(x+2, y, img, porte);
        })
    }else{}
}