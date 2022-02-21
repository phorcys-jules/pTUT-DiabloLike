import ImageUtils from "../engine/ImageUtils.js";
import { Character } from "./Character.js";
import { Entity } from "./Entity.js";

export class Zombie extends Entity {
    /**
     * Temps en ms depuis la dernière action : attaque, changement de direction,...
     */
    timeSinceLastAction:number=0;

    public static isActive: boolean = true;

    constructor (){
        super();
    }

    evolve(delta:number): void {
        this.timeSinceLastAction+=delta;
        if (this.timeSinceLastAction>=1) {
            this.timeSinceLastAction=0;
            this.dir = Math.round((Math.random()*4));
        }    
        if (Zombie.isActive) {
            this.walk(this.dir, delta);
        }
        
    }
    protected async loadSprites() {
        super.loadSprites();
        this.sprites = await ImageUtils.loadImageFromUrl("./assets/img/mob/zombie_sprites.png");
        
    }
}
