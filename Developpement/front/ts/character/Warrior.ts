import Game from "../engine/Game.js";
import GameMap from "../engine/GameMap.js";
import ImageUtils from "../engine/ImageUtils.js";
import { GameImage } from "../map/GameImage.js";
import { Character } from "./Character.js";

export class Warrior extends Character {
    swordImage: any;

    constructor(name: string = 'michou', lvl: number = 1, speed: number = 100, strenth: number = 1, attackSpeed: number = 1, maxHp: number = 40, maxMp: number = 20, x: number = 64, y: number = 64, spellImg: string[] = ["./assets/img/capacity/Interface/warrior_spell1.png", "./assets/img/capacity/Interface/gray_backgroud.png"]) {
        super(name, lvl, speed, strenth, attackSpeed, maxHp, maxMp, x, y);
        this.attackSound = new Audio('./assets/sound/entity/sword_attack.mp3');
        this.swordImage = new GameImage(this.x, this.y + 16, 32, 32, "./assets/img/capacity/Game/sword.png")
        this.spellImg = spellImg;
        this.updateAffichageStats();

    }

    protected async loadSprites() {
        this.sprites = await ImageUtils.loadImageFromUrl("./assets/img/perso/warrior_sprites.png");
        this.currentSprite = [0, 0];
    }

    attack(): number {
        this.attackSound.play();
        //this.sword();
        let sendX = this.x;
        let sendY = this.y;
        switch (this.direction) {
            case 1:
                sendX += 10;
                break;
            case 3:
            case -1:
                sendX += 10;
                sendY += 32;
                break;
            case 2:
                sendX += 32;
                sendY += 10;
                break;
            case 4:
            case -2:
                sendY += 10;
                break;
        }
        let swrImg = this.swordImage;
        let direction = this.direction;

        GameMap.renderable.push(function feu() {
            sword(sendX, sendY, swrImg, 64, direction);
        })
        return this.strenth;
    }


}
async function sword(x: number, y: number, img: GameImage, porte: number = 64, direction: number) {
    //console.log("fireeeeeeeeeeeeeeee !", porte)
    //64 : porté du sort
    try {
        porte -= 16;
        Game.context.drawImage(await img.getImg(), x, y);
    } catch (error) {
        console.log(error)
    }
    GameMap.renderable.pop();
    if (porte > 0) {
        //console.log(direction, " dir ", x, y);
        switch (direction) {
            case 1:
                y -= 3;
                break;
            case 3:
            case -1:
                y += 3;
                break;
            case 2:
                x += 3;
                break;
            case 4:
            case -2:
                x -= 3;
                break;
        }
        GameMap.renderable.push(function fer() {
            sword(x, y, img, porte, direction);
        })
    } else { }
}
