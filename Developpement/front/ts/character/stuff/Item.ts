import ImageUtils from "../../engine/ImageUtils";

export class Item  {


  private name : String;

  constructor(name:String){
    this.name=name;
  }

  public async displayItem(context : CanvasRenderingContext2D) {
    let itm : HTMLImageElement|null = null;

    if(this.name=='popoVie'){
       itm   = await ImageUtils.loadImageFromUrl("./assets/img/stuff/potion/potion_vie.png");
    }
    if(this.name=='popoXp'){
      itm = await ImageUtils.loadImageFromUrl("./assets/img/stuff/potion/potion_xp.png");
    }
    if(this.name=='popoMana'){
      itm = await ImageUtils.loadImageFromUrl("./assets/img/stuff/potion/potion_mana.png");
    }

    context.drawImage(itm!, 3 * 64, 3 * 64);
  }
  action(){

  }
  
}