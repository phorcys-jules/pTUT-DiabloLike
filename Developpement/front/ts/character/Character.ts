import GameMap from "../engine/GameMap.js";
import ImageUtils from "../engine/ImageUtils.js";
import { Block } from "../map/block.js";
import { Entity } from "./Entity.js";
//import Stuff from "./stuff/Stuff.js";

export abstract class Character extends Entity {



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

                //Si on reçoit des dégats aloçrs on recule
                super.knockback(-direction, delta);
                monstre.knockback(direction, delta)
            }
        });
    }

    addHp(amount: number): number {
        let res = super.addHp(amount);
        this.updateAffichageStats();
        return res;
    }


}
