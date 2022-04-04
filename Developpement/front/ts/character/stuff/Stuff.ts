import {Item} from "./Item";

export class Stuff  {

    itemList;
    public static div = document.getElementById("inventory") as HTMLDivElement;
    public visible : boolean;

    constructor(itemList: Array<Item>) {
      this.itemList = itemList;
      this.visible=false;
    }


    public displayStuff() {
      
    }

    public hide(){
    }
}