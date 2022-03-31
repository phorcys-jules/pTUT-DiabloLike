import Game from "../engine/Game.js";
import ImageUtils from "../engine/ImageUtils.js";
import { Character } from "./Character.js";
import { GameImage } from "../map/GameImage.js";
import GameMap from "../engine/GameMap.js";


export class Wizard extends Character {

    public fireballImage: GameImage;


    constructor(name: string = 'michou', lvl: number = 1, speed: number = 100, strenth: number = 1, attackSpeed: number = 4, maxHp: number = 20, maxMp: number = 20, x: number = 64, y: number = 64) {
        super(name, lvl, speed, strenth, attackSpeed, maxHp, maxMp, x, y);
        this.attackSound = new Audio('./assets/sound/entity/fireball_attack.mp3');
        this.fireballImage = new GameImage(this.x, this.y + 16, 32, 32, "./assets/img/capacity/fireball.png")
        this.updateAffichageStats();
        
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
        let fireImg = this.fireballImage;
        let direction = this.direction;

        GameMap.renderable.push(function feu() {
            fireball(sendX, sendY, fireImg, 64, direction);
        })
        return this.strenth;
    }


}

async function fireball(x: number , y:number , img:GameImage, porte:number = 64, direction:number){
    //console.log("fireeeeeeeeeeeeeeee !", porte)
    //64 : porté du sort
    try {
        porte-=2;
        Game.context.drawImage(await img.getImg(), x, y);
    } catch (error) {
        console.log(error)
    }
    GameMap.renderable.pop();
    if (porte > 0 ) {
        //console.log(direction, " dir ", x, y);
        switch (direction) {
            case 1:
                y -= 9;
                break;
            case 3 :
            case -1:
                y += 9;
                break;
            case 2:
                x += 9;
                break;
            case 4 :
            case -2:
                x -= 9;
                break;
        }
        GameMap.renderable.push(function feu() {
            fireball(x, y, img, porte, direction);
        })
    }else{}
}