import Game from "../engine/Game.js";
import GameMap from "../engine/GameMap.js";
import ImageUtils from "../engine/ImageUtils.js";
import { Block } from "../map/block.js";
import { Entity } from "./Entity.js";
//import Stuff from "./stuff/Stuff.js";

export abstract class Character extends Entity {


    spellImg: string[];

    constructor(name: string = 'great green stick', lvl: number = 1, speed: number = 100, strenth: number = 1, attackSpeed: number = 3,maxHp: number = 20, maxMp: number = 10, x: number = 64, y: number = 64, spellImg: string[] = ['./assets/img/capacity/Interface/null_spell.png', './assets/img/capacity/Interface/white_background.png']) {
        super(name, lvl, speed, strenth, attackSpeed, maxHp, maxMp, x, y);
        this.spellImg = spellImg;
    }

    /**
     * Déplace le perso dans la dir associé
     * @param direction
     * 1 : N,
     * 2 : S,
     * 3 : E,
     * 4 : O
     * @param delta : temps depuis la dernière boucle : anti-lag
     */
    walk(direction: number, delta: number, mob: Entity[]) {
        super.walk(direction, delta, mob);
        //console.log("delta : ", delta);

        mob.forEach(monstre => {
            //console.log("mob : ", monstre.x, monstre.y, "\n hero : ", this.x, this.y);
            if (this.x - 32 < monstre.x && this.x + 32 > monstre.x &&
                this.y - 32 < monstre.y && this.y + 32 > monstre.y) {
                console.log("collision hero, monstre");
                this.addHp(-monstre.attack());

                //Si on reçoit des dégats alors on recule
                super.knockback(-direction, delta);
                monstre.knockback(direction, delta)
            }
        });
    }

    addHp(amount: number): number {
        let res = super.addHp(amount);
        this.updateAffichageStats();
        if (res <= 0) {
            Game.stop();
        }
        return res;
    }


}
