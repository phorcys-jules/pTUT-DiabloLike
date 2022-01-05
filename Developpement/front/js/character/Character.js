var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ImageUtils from "../engine/ImageUtils.js";
export class Character extends Object {
    constructor(name, lvl = 1, speed = 1, x = 64, y = 64) {
        //Level has  default value of 1
        super();
        this.name = name;
        this.lvl = lvl;
        this.speed = speed;
        this.x = x;
        this.y = y;
        this.loadSprites();
    }
    loadSprites() {
        return __awaiter(this, void 0, void 0, function* () {
            this.sprites = yield ImageUtils.loadImageFromUrl("./assets/img/perso/sprites.png");
            this.currentSprite = [0, 0];
        });
    }
    paint(context) {
        context.drawImage(this.sprites, this.currentSprite[0], this.currentSprite[1], 64, 64, this.x, this.y, 64, 64);
        this.nextSprites();
    }
    nextSprites() {
        if (this.currentSprite[0] == 64) {
            this.currentSprite[0] = 0;
        }
        else {
            this.currentSprite[0] += 64;
        }
    }
    toString() {
        return `${this.name} est un ${this.constructor.name} de niveau ${this.lvl}`;
    }
    /**
     * Déplace le perso dans la dir associé
     * @param direction
     * 1 : N,
     * 2 : S,
     * 3 : E,
     * 4 : O
     */
    walk(direction) {
        //TODO if en collision, return -1
        switch (direction) {
            case 1:
                this.y -= this.speed;
                this.currentSprite[1] = 192;
                break;
            case 2:
                this.y += this.speed;
                this.currentSprite[1] = 0;
                break;
            case 3:
                this.x += this.speed;
                this.currentSprite[1] = 64;
                break;
            case 4:
                this.x -= this.speed;
                this.currentSprite[1] = 128;
                break;
        }
    }
}
