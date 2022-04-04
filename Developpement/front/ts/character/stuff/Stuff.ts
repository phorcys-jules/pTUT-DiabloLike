import Game from "../../engine/Game";
import ImageUtils from "../../engine/ImageUtils";
import {Item} from "./Item";

export class Stuff  {

    itemList;
    public static div = document.getElementById("inventory") as HTMLDivElement;
    public visible : boolean;

    constructor(itemList: Array<Item>) {
      this.itemList = [new Item('popoVie'), new Item('popoXp'), new Item('popoMana')];
      this.visible=false;
    }


    public async displayStuff() {
      const logoImage = await ImageUtils.loadImageFromUrl("./assets/img/stuff/stuff.png");
      Game.context.drawImage(logoImage, 3 * 64, 3 * 64);

      this.itemList.forEach(item => {
        item.displayItem(Game.context);
      });
    }

    public hide(){
    }
}