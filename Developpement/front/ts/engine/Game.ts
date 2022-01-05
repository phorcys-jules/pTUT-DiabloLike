import ImageUtils  from "./ImageUtils.js";
import GameMap  from "./GameMap.js";
import GameLoop  from "./GameLoop.js";
import { Character } from "../character/Character.js";

class Game {

  private canvasEl: HTMLCanvasElement;

  private context: CanvasRenderingContext2D;
  private width: number;
  private height: number;

  private map: GameMap;
  private mobImage: HTMLImageElement;

  private char:Character;


  /**
   * key : name key down,
   * value : isDown ? 
   */
  //private keyStates: {[key: string]: boolean} = {};
  private keyStates:string[]=[];
  

  constructor(canvasEl: HTMLCanvasElement, char:Character ){
    this.canvasEl = canvasEl;
    this.context = canvasEl.getContext("2d") as  CanvasRenderingContext2D;
    this.width = canvasEl.width;
    this.height = canvasEl.height;

    this.char=char;

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
        if(! this.keyStates.includes(e.key)){
          this.keyStates.push(e.key);
        }
    })
    document.addEventListener("keyup", e => {
      e.preventDefault();
      //this.keyStates[e.key] = false;
      this.keyStates.splice(this.keyStates.indexOf(e.key));
    })

  }
  public isKeyDown(key: string) {
    return this.keyStates.includes(key);
  }

  public isAnyKeyDown() {
    return this.keyStates.length !=0;
  }

  public async run() {
    console.log('GG u run the Game');
    
    //bg image
    const img = await ImageUtils.loadImageFromUrl("./assets/img/map/dirt.jpg");
    const border = await ImageUtils.loadImageFromUrl("./assets/img/map/border.jpg");
    const wall = await ImageUtils.loadImageFromUrl("./assets/img/map/wall.png");
    this.map = new GameMap(img, border, wall, this.width, this.height)

    this.mobImage = await ImageUtils.loadImageFromUrl("./assets/img/mob/zombie_bas.png");
    this.context.drawImage(this.mobImage, 3*64, 3*64);


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

    //Détéction des touches et lancement des fonctions associé
    if (this.isAnyKeyDown()) {
      if (this.isKeyDown("d") || this.isKeyDown("ArrowRight")) {
        this.char.walk(3);
      } else if (this.isKeyDown("q") || this.isKeyDown("ArrowLeft")) {
        this.char.walk(4);
      }
      if (this.isKeyDown("s") || this.isKeyDown("ArrowDown")) {
        this.char.walk(2);
      } else if (this.isKeyDown("z") || this.isKeyDown("ArrowUp")) {
        this.char.walk(1);
      }
      
    }

    //redessine le perso
    this.char.paint(this.context);
    //console.log(this.keyStates);
    
  }

}

export default Game;




