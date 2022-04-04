import Game from "../engine/Game.js";
import GameMap from "../engine/GameMap.js";
import ImageUtils from "../engine/ImageUtils.js";
import { GameImage } from "../map/GameImage.js";
import { Character } from "./Character.js";

export class Archer extends Character {

    arrowImgHori: any;
    arrowImgVert: any;

    constructor(name: string = 'great green stick',
        lvl: number = 1,
        speed: number = 100,
        strenth: number = 1,
        attackSpeed: number = 3,
        maxHp: number = 20,
        maxMp: number = 10,
        x: number = 64,
        y: number = 64,
        spellImg: string[] = ["./assets/img/capacity/Interface/archer_spell1.png", "./assets/img/capacity/Interface/gray_backgroud.png"]) {


        super(name, lvl, speed, strenth, attackSpeed, maxHp, maxMp, x, y);
        this.attackSound = new Audio('./assets/sound/entity/bow_sound.mp3');
        this.arrowImgHori = new GameImage(this.x, this.y + 16, 32, 32, "./assets/img/capacity/Game/arrow_hori.png")
        this.arrowImgVert = new GameImage(this.x, this.y + 16, 32, 32, "./assets/img/capacity/Game/arrow_vert.png")
        this.spellImg = spellImg;
        this.updateAffichageStats();

    }

    protected async loadSprites() {
        this.sprites = await ImageUtils.loadImageFromUrl("./assets/img/perso/archer_sprites.png");
        this.currentSprite = [0, 0];
    }

    attack(): number {
        this.attackSound.play();
        //this.sword();
        let sendX = this.x;
        let sendY = this.y;
        let arwImg: any;
        switch (this.direction) {
            case 1:
                arwImg = this.arrowImgVert;
                break;
            case 3:
            case -1:
                sendY += 32;
                arwImg = this.arrowImgVert;
                break;
            case 2:
                sendX += 32;
                sendY += 10;
                arwImg = this.arrowImgHori;
                break;
            case 4:
            case -2:
                sendY += 10;
                arwImg = this.arrowImgHori;
                break;
        }
        let direction = this.direction;

        GameMap.renderable.push(function feu() {
            arrow(sendX, sendY, arwImg, 320, direction);
        })
        return this.strenth;
    }


}
async function arrow(x: number, y: number, img: GameImage, porte: number = 64, direction: number) {
    let i =0;//index of the monster
    Game.mob.forEach(mob => {
        if (mob.x - 32 < x && mob.x + 32 > x &&
            mob.y - 32 < y && mob.y + 32 > y) {
            Game.mob.splice(i);
            Game.player.updateGold(+5);
            GameMap.renderable.pop();
            return -1; //on arrête la flèche après une collision
        }

    });

    //64 : porté du sort
    porte -= 16;
    try {
        Game.context.drawImage(await img.getImg(), x, y);
    } catch (error) {
        console.log(error)
    }
    GameMap.renderable.pop();
    if (porte > 0) {
        //console.log(direction, " dir ", x, y);
        switch (direction) {
            case 1:
                y -= 15;
                break;
            case 3:
            case -1:
                y += 15;
                break;
            case 2:
                x += 15;
                break;
            case 4:
            case -2:
                x -= 15;
                break;
        }
        GameMap.renderable.push(function fer() {
            arrow(x, y, img, porte, direction);
        })
    } else { }
}

