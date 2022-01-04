import ImageUtils  from "./ImageUtils.js";
import GameMap  from "./GameMap.js";
import GameLoop  from "./GameLoop.js";

class Game {

  private canvasEl: HTMLCanvasElement

  private context: CanvasRenderingContext2D;
  private width: number;
  private height: number;

  private map: GameMap;
  private charImage: HTMLImageElement;
  private charX = 64;
  private charY = 64;
  /**
   * key : name key down,
   * value : isDown ? 
   */
  private keyStates: {[key: string]: boolean} = {};

  constructor(canvasEl: HTMLCanvasElement) {
    this.canvasEl = canvasEl;
    this.context = canvasEl.getContext("2d") as  CanvasRenderingContext2D;
    this.width = canvasEl.width;
    this.height = canvasEl.height;

    this.setup()
    
  }
  
  public init(this: any): EventListenerOrEventListenerObject {
    return this.setup(this.canvasEl);
  }
  /**
   * setup some action as key Mapping
   */
  private setup() {
    
    document.addEventListener("keydown", e => {
      e.preventDefault();
      this.keyStates[e.key] = true;
    })
    document.addEventListener("keyup", e => {
      e.preventDefault();
      this.keyStates[e.key] = false;
    })

  }

  public async run() {
    console.log('GG u run the Game');
    
    //bg image
    const img = await ImageUtils.loadImageFromUrl("./assets/img/map/dirt.jpg");
    const border = await ImageUtils.loadImageFromUrl("./assets/img/map/border.jpg");
    const wall = await ImageUtils.loadImageFromUrl("./assets/img/map/wall.png");
    this.map = new GameMap(img, border, wall, this.width, this.height)

    this.charImage = await ImageUtils.loadImageFromUrl("./assets/img/perso/perso_bas.png");

    const gameLoop = new GameLoop(this.loop.bind(this));
    gameLoop.run();
  }

  /**
   * Appeler a chaque update du jeu
   * @param delta tmps depuis dernier appel
   */
  private loop(delta: number) {
    //tmp for presentation TODO remove
    delta*=4;

    //redessine la carte
    this.map.render(this.context);

    //déplace le perso en f° du temps écouler

    if (this.keyStates["d"] || this.keyStates["ArrowRight"]) {
      this.charX += 30 * delta;
    } else if (this.keyStates["q"] || this.keyStates["ArrowLeft"]) {
      this.charX -= 30 * delta;
    }
    
    if (this.keyStates["s"] || this.keyStates["ArrowDown"]) {
      this.charY += 30 * delta;
    } else if (this.keyStates["z"] || this.keyStates["ArrowUp"]) {
      this.charY -= 30 * delta;
    }

    //redessine le perso
    this.context.drawImage(this.charImage, this.charX, this.charY);
  }

}

export default Game;




