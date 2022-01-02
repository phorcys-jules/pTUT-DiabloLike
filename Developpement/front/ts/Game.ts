import ImageUtils  from "./ImageUtils.js";
import GameMap  from "./GameMap.js";
//import GameLoop  from "./GameLoop.js";

class Game {

  private context: CanvasRenderingContext2D;
  private width: number;
  private height: number;

  private map: GameMap;
  private charImage: HTMLImageElement;
  private charX = 0;
  private charY = 0;

  constructor(context: CanvasRenderingContext2D, width: number, height: number) {
    this.context = context;
    this.width = width;
    this.height = height;
    
  }

  public async run() {
    //bg image
    const img = await ImageUtils.loadImageFromUrl("./assets/img/map/dirt.jpg");
    this.map = new GameMap(img, this.width, this.height)

    this.charImage = await ImageUtils.loadImageFromUrl("./assets/img/perso/perso_bas.png");


    const gameLoop = new GameLoop(this.loop.bind(this));
    gameLoop.run();
  }

  private loop(delta: number) {
    console.log(this.map)
    this.map.render(this.context);

    this.charX += 30 * delta;
    this.charY += 30 * delta;
    this.context.drawImage(this.charImage, this.charX, this.charY);
  }

}

export default Game;
