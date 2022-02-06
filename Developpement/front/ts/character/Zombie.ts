import ImageUtils from "../engine/ImageUtils";
import { Character } from "./Character";

export class Zombie extends Character {
    /**
     * Temps en ms depuis la dernière action : attaque, changement de direction,...
     */
    timeSinceLastAction:number=0;

    constructor (){
        super();
    }

    evolve(delta:number): void {
        this.timeSinceLastAction+=delta;
        if (this.timeSinceLastAction>=1) {
            this.timeSinceLastAction=0;
            this.dir = Math.round((Math.random()*4));
        }    
        
        this.walk(this.dir, delta);
    }
    protected async loadSprites() {
        super.loadSprites();
        this.sprites = await ImageUtils.loadImageFromUrl("./assets/img/mob/zombie_sprites.png");
        
    }
}
