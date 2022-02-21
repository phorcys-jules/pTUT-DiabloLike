import GameMap from "../engine/GameMap.js";
import ImageUtils from "../engine/ImageUtils.js";
import { Block } from "../map/block.js";
//import Stuff from "./stuff/Stuff.js";

export abstract class Entity extends Object {

    name: string;
    lvl: number;
    xp: number;
    speed: number;
    strenth: number;
    hp: number;
    maxHp: number;
    mp: number;
    maxMp: number;

    x: number;
    y: number;
    sprites: HTMLImageElement;
    multiSprite: number;
    /**
     * x, y of the current sprite
     */
    currentSprite: number[];
    dir: number = 2;

    //Entity cans move to N,S,E,O ?
    movable: boolean[] = [true, true, true, true]

    //stuff:Stuff[];

    //sound 
    
    public attackSound: HTMLAudioElement;


    constructor(name: string = 'michou', lvl: number = 1, speed: number = 100, strenth: number = 1, maxHp: number = 20, maxMp: number = 20, x: number = 64, y: number = 64) {
        //Level has  default value of 1
        super();
        this.name = name;
        this.lvl = lvl;
        this.xp = 0;
        this.speed = speed;
        this.strenth = strenth;
        this.hp = maxHp;
        this.maxHp = maxHp;
        this.mp = maxMp;
        this.maxMp = maxMp;
        this.x = x;
        this.y = y;
        this.multiSprite = 1;
        console.log(this.name);
        this.loadSprites();
    }

    protected async loadSprites() {
        this.sprites = await ImageUtils.loadImageFromUrl("./assets/img/perso/sprites.png");
        this.currentSprite = [0, 0];
        console.log("you're supposed to rededfine this function with the correct sprite")
    }

    paint(context: CanvasRenderingContext2D) {
        context.drawImage(this.sprites, this.currentSprite[0], this.currentSprite[1], 64, 64, this.x, this.y, 64, 64);
    }
    nextSprites() {
        if (this.currentSprite[0] == 128)
            this.multiSprite = -1;
        if (this.currentSprite[0] == 0)
            this.multiSprite = 1;
        this.currentSprite[0] += 64 * this.multiSprite;

    }

    toString() {
        return `${this.name} est un ${this.constructor.name} de niveau ${this.lvl}`
    }

    evolve(delat: number) { };

    /**
     * Déplace le perso dans la dir associé
     * @param direction
     * 1 : N,
     * -1 || 3 : S,
     * 2 : E,
     * -2 || 4: O
     * @param delta : temps depuis la dernière boucle : anti-lag
     */
    walk(direction: number, delta: number, mob: Entity[] = []) {
        let coord = this.getBlockPos();
        //console.log(coord);
        //console.log(GameMap.maps[0][3].solid);
        switch (direction) {
            case 1:
                // x, newY + décalage par rapport a 0 de l'image qui se situe au pied
                this.currentSprite[1] = 192;
                if (!this.isBlockSolid(this.x, this.y - this.speed * delta - 48)) {
                    this.y -= this.speed * delta;
                }
                break;
            case 3 :
            case -1:
                this.currentSprite[1] = 0;
                if (!this.isBlockSolid(this.x, this.y + this.speed * delta)) {
                    this.y += this.speed * delta;
                }

                break;
            case 2:
                this.currentSprite[1] = 64;
                if (!this.isBlockSolid(this.x + this.speed * delta, this.y)) {
                    this.x += this.speed * delta;
                }

                break;
            case 4 :
            case -2:
                this.currentSprite[1] = 128;
                if (!this.isBlockSolid(this.x - this.speed * delta, this.y)) {
                    this.x -= this.speed * delta;
                }
                break;
        }
        this.getBlockFromPos().collisionJoueur();

    }

    /**
     * Fait reculer l'entite en arrière suita à un coup
     * @param direction 
     */
    knockback(direction: number, delta : number){
        switch (direction) {
            case 1:
                this.y -= this.speed * delta*10;
                break;
            case 3 :
            case -1:
                this.y += this.speed * delta*10;
                break;
            case 2:
                this.x += this.speed * delta*10;
                break;
            case 4 :
            case -2:
                this.x -= this.speed * delta*10;
                break;
        }
    }

    addXP(amount: number) {
        this.xp += amount;
        if (this.xp >= 1, 2 * (this.lvl + 100)) {
            this.lvl += 1;
            this.xp = 0;

            //Up stats
            this.hp += 2;
            this.maxHp += 2;
            this.mp += 2;
            this.maxMp += 2;
            this.strenth += 2;
        }
    }

    addMana(amount: number) {
        //Si atteint lim basse ou haute
        if (this.mp + amount >= this.maxMp) {
            this.mp += amount = 64;
        } else {
            if (this.mp + amount <= 0) {
                this.mp = 0;
            } else {
                //cas OK
                this.mp += amount;
            }
        }
        this.updateAffichageStats();
    }

    addHp(amount: number) {
        //Si atteint lim basse ou haute
        if (this.hp + amount >= this.maxHp) {
            this.hp += amount = 64;
        } else {
            if (this.hp + amount <= 0) {
                this.hp = 0;
            } else {
                //cas OK
                this.hp += amount;
            }
        }
        this.updateAffichageStats();
    }

    /**
     * @returns la position dans le tableau du block en x y
     */
    getBlockPos(y: number = this.y, x: number = this.x): number[] {
        return [Math.round(x / 64), Math.round(y / 64)];
    }

    /**
     * @returns le block en x y
     */
    getBlockFromPos(y: number = this.y, x: number = this.x): Block {
        let blCord: number[] = this.getBlockPos(x, y);
        return GameMap.maps[blCord[0]][blCord[1]];
    }

    /**
     * @returns true si le block aux coordonnées x,y est solid
     */
    isBlockSolid(x: number, y: number): boolean {
        let blCord: number[] = this.getBlockPos(x, y);
        try {
            //console.log(GameMap.maps[blCord[0]][blCord[1]].solid);
            return GameMap.maps[blCord[0]][blCord[1]].solid
        } catch (error) {
            console.log(error);
            return true

        }
        return true;
    }

    attack(): number {
        this.attackSound.play();
        return this.strenth;
    }

    updateAffichageStats() {
        try {
            const hpLabel = document.getElementById('heroHp') as HTMLElement;
            hpLabel.innerHTML = this.hp.toString();
            const mpLabel = document.getElementById('heroMp') as HTMLElement;
            mpLabel.innerHTML = this.mp.toString();
          } catch (error) {}
    }
}
