import ImageUtils from "../../engine/ImageUtils";

export class Item  {


  public name : String;

  constructor(name:String){
    this.name=name;
  }

  /**public static async loadImage() {
    console.log('chargement');

    if(this.name=='popoVie'){
      const logoImage = await ImageUtils.loadImageFromUrl("./assets/img/stuff/potion/potion_vie.png");
    }
    if(this.name=='popoXp'){
      const logoImage = await ImageUtils.loadImageFromUrl("./assets/img/stuff/potion/potion_xp.png");
    }
    if(this.name=='popoMana'){
      const logoImage = await ImageUtils.loadImageFromUrl("./assets/img/stuff/potion/potion_mana.png");
    }
    //Game.gameLoop.stop()

    //this.context.drawImage(logoImage, 3 * 64, 3 * 64);
  }
  action(){

  }
  */
}