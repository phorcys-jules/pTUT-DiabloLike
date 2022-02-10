import GameMap from "../engine/GameMap.js";
import ImageUtils from "../engine/ImageUtils.js";
import { Block } from "../map/block.js";
//import Stuff from "./stuff/Stuff.js";

export abstract class Character extends Object {

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
    /**
     * x, y of the current sprite
     */
    currentSprite: number[];
    dir: number = 2;

    //character cans move to N,S,E,O ?
    movable: boolean[] = [true, true, true, true]

    //stuff:Stuff[];


    constructor(name: string = 'michou', lvl: number = 1, speed: number = 100, strenth: number = 1, maxHp: number = 1, maxMp: number = 1, x: number = 64, y: number = 64) {
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
        if (this.currentSprite[0] == 64) {
            this.currentSprite[0] = 0;
        } else {
            this.currentSprite[0] += 64;
        }
    }

    toString() {
        return `${this.name} est un ${this.constructor.name} de niveau ${this.lvl}`
    }

    evolve(delat: number) { };

    /**
     * Déplace le perso dans la dir associé
     * @param direction
     * 1 : N,
     * 2 : S,
     * 3 : E,
     * 4 : O
     * @param delta : temps depuis la dernière boucle : anti-lag
     */
    walk(direction: number, delta: number) {
        //TODO if en collision, return -1
        let coord = this.getBlockPos();
        //console.log(coord);
        //console.log(GameMap.maps[0][3].solid);
        switch (direction) {
            case 1:
                // x, newY + décalage par rapport a 0 de l'image qui se situe au pied
                if (!this.isBlockSolid(this.x, this.y - this.speed * delta-48)) {
                    this.y -= this.speed * delta;
                    this.currentSprite[1] = 192;
                }
                break;
            case 2:
                //if (!GameMap.maps[coord[1]][coord[0]].solid || (GameMap.maps[coord[1]][coord[0]].solid && !GameMap.maps[coord[1] + 1][coord[0]].solid)) {
                //if (!GameMap.maps[coord[1] + 1][coord[0]].solid) {
                if (!this.isBlockSolid(this.x, this.y + this.speed * delta+32)) {
                    this.y += this.speed * delta;
                    this.currentSprite[1] = 0;
                }

                break;
            case 3:
                //if (!GameMap.maps[coord[1]][coord[0]].solid || (GameMap.maps[coord[1]][coord[0]].solid && !GameMap.maps[coord[1]][coord[0] + 1].solid)) {
                //if (!GameMap.maps[coord[1]][coord[0] + 1].solid) {
                if (!this.isBlockSolid(this.x +this.speed*delta+32, this.y)) {
                    this.x += this.speed * delta;
                    this.currentSprite[1] = 64;
                }

                break;
            case 4:
                //if (!GameMap.maps[coord[1]][coord[0]].solid || (GameMap.maps[coord[1]][coord[0]].solid && !GameMap.maps[coord[1] + 1][coord[0] - 1].solid)) {
                if (!this.isBlockSolid(this.x - this.speed*delta-32, this.y)) {
                    this.x -= this.speed * delta;
                    this.currentSprite[1] = 128;
                }

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
    }

    getBlockPos(y: number = this.y, x: number = this.x): number[] {
        return [Math.round(x / 64), Math.round(y / 64)];
    }

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
}
