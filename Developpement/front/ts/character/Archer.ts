import ImageUtils from "../engine/ImageUtils.js";
import { Character } from "./Character.js";

export class Archer extends Character {

    protected async loadSprites() {
        this.sprites = await ImageUtils.loadImageFromUrl("./assets/img/perso/elves_sprites_taller.png");
        this.currentSprite=[0,0];
    }
}
