import ImageUtils from "../engine/ImageUtils.js";
import { Character } from "./Character.js";

export class Wizard extends Character {


    protected async loadSprites() {
        this.sprites = await ImageUtils.loadImageFromUrl("./assets/img/perso/wizard_sprites.png");
        this.currentSprite=[0,0];
    }
}
