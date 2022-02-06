import ImageUtils  from "./ImageUtils";
import GameMap  from "./GameMap";
import GameLoop  from "./GameLoop";
import { Character } from "../character/Character";
import * as e from "cors";

class Game {

  private canvasEl: HTMLCanvasElement;

  private context: CanvasRenderingContext2D;
  private width: number;
  private height: number;

  private map: GameMap;
  private mobImage: HTMLImageElement;

  private hero:Character;
  private char:Character[];

  /**
   * Deltas en ms depuis le dernier refresh
   */
  private timeSinceLastFPS:number = 0;
  private frame: number=0;


  /**
   * key : name key down,
   * value : isDown ? 
   */
  //private keyStates: {[key: string]: boolean} = {};
  private keyStates:string[]=[];
  
  

  constructor(canvasEl: HTMLCanvasElement, hero:Character, char:Character[]=[]){
    this.canvasEl = canvasEl;
    this.context = canvasEl.getContext("2d") as  CanvasRenderingContext2D;
    this.width = canvasEl.width;
    this.height = canvasEl.height;

    this.hero=hero;
    this.char = char;

    this.setup()
    
  }
  
  public init(this: any): EventListenerOrEventListenerObject {
    return this.setup(this.canvasEl);
  }
  /**
   * setup some action as key Mapping
   */
  private setup() {
    let frame = 0;
    
    document.addEventListener("keydown", e => {
        if(! this.keyStates.includes(e.key)){
          this.keyStates.push(e.key);
        }
    }),
    document.addEventListener("keypress", e => {
      if(! this.keyStates.includes(e.key)){
        console.log("pressed ", e.key)
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
    this.map = new GameMap();
    /*
    let bFlor = new Block(0, 0, 64, 64, false, img);
    let bBord = new Block(0, 0, 64, 64, true, border);

    let newBlocks = [[bBord, bBord, bBord, bBord, bBord, bBord, bBord, bBord, bBord, bBord, bBord, bBord, bBord, bBord, bBord, bBord, bBord, bBord, bBord, bBord],
                     [bBord, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bBord],
                     [bBord, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bBord],
                     [bBord, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bBord],
                     [bBord, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bBord],
                     [bBord, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bBord],
                     [bBord, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bBord],
                     [bBord, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bBord],
                     [bBord, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bBord],
                     [bBord, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bBord],
                     [bBord, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bBord],
                     [bBord, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bBord],
                     [bBord, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bFlor, bBord],
                     [bBord, bBord, bBord, bBord, bBord, bBord, bBord, bBord, bBord, bBord, bBord, bBord, bBord, bBord, bBord, bBord, bBord, bBord, bBord, bBord]];

    this.map.setMaps(newBlocks);
    */
   this.map.initMap(0);

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
    this.timeSinceLastFPS+=delta;
    


    //Détéction des touches et lancement des fonctions associé
    if (this.isAnyKeyDown()) {
      if (this.isKeyDown("d") || this.isKeyDown("ArrowRight")) {
        this.hero.walk(3, delta);
      } else if (this.isKeyDown("q") || this.isKeyDown("ArrowLeft")) {
        this.hero.walk(4, delta);
      }
      if (this.isKeyDown("s") || this.isKeyDown("ArrowDown")) {
        this.hero.walk(2, delta);
      } else if (this.isKeyDown("z") || this.isKeyDown("ArrowUp")) {
        this.hero.walk(1, delta);
      }
    }



    //1/60 pour 1 image toutes les 60 secondes
    if(this.timeSinceLastFPS>=1/60) {
      this.timeSinceLastFPS=0;
      this.frame+=1;
      //redessine la carte
      this.map.render(this.context);
      //redessine le perso
      this.hero.paint(this.context);

      this.char.forEach((entity) =>{
        entity.evolve(delta);
        entity.paint(this.context)
      });
    };

    //1 sprite toute les 5 frames
    if (this.frame===5) {
      this.frame=0;
      this.hero.nextSprites();
      this.char.forEach((entity) =>{
        entity.nextSprites();
      });
    }else{
      console.log("false");
    }

  }

}

export default Game;




