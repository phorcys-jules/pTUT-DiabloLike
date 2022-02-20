import ImageUtils from "./ImageUtils.js";
import GameMap from "./GameMap.js";
import GameLoop from "./GameLoop.js";
import { Character } from "../character/Character.js";
import { Wizard } from "../character/Wizard.js";
import { Archer } from "../character/Archer.js";

class Game {

  private canvasEl: HTMLCanvasElement;

  private context: CanvasRenderingContext2D;
  private width: number;
  private height: number;

  private mobImage: HTMLImageElement;

  private hero: Character;
  private char: Character[];

  /**
   * Deltas en ms depuis le dernier refresh
   */
  private timeSinceLastFPS: number = 0;
  private frame: number = 0;


  /**
   * Touches sur lesquelles on peut rester appuyé
   * key : name key down,
   * value : isDown ? 
   */
  private keyStates: string[] = [];


  constructor(canvasEl: HTMLCanvasElement, hero: Character, char: Character[] = []) {
    this.canvasEl = canvasEl;
    this.context = canvasEl.getContext("2d") as CanvasRenderingContext2D;
    this.width = canvasEl.width;
    this.height = canvasEl.height;

    this.hero = hero;
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
      if (!this.keyStates.includes(e.key)) {
        this.keyStates.push(e.key);
      }
    }),
      //Touches que l'on presse simplement pour effectuer UNE action
      document.addEventListener("keypress", e => {
        //console.log(e.key);

        switch (e.key) {
          case 'p':
            this.switchPerso();
            break;
          case 'b':
            GameMap.previousFloor();
            break;
          case 'n':
            GameMap.nextFloor();
            break;
          //debug
          case 'h':
            console.log("pos hero : ", this.hero.x, ", ", this.hero.y, "\n",
              "map : ", GameMap.maps, "\n"
            );
            break;
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
    return this.keyStates.length != 0;
  }

  public async run() {
    console.log('GG u run the Game');

    GameMap.initMap();

    //this.mobImage = await ImageUtils.loadImageFromUrl("./assets/img/mob/zombie_sprites.png");
    //this.context.drawImage(this.mobImage, 3 * 64, 3 * 64);


    const gameLoop = new GameLoop(this.loop.bind(this));
    gameLoop.run();
  }

  /**
   * Appeler a chaque update du jeu
   * @param delta tmps depuis dernier appel
   */
  private async loop(delta: number) {
    this.timeSinceLastFPS += delta;



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
    if (this.timeSinceLastFPS >= 1 / 60) {
      this.timeSinceLastFPS = 0;
      this.frame += 1;
      //redessine la carte
      await GameMap.render(this.context);
      //redessine le perso
      this.hero.paint(this.context);

      this.char.forEach((entity) => {
        entity.evolve(delta);
        entity.paint(this.context)
      });
    };

    //1 sprite toute les 5 frames
    if (this.frame === 8) {
      this.frame = 0;
      this.hero.nextSprites();
      this.char.forEach((entity) => {
        entity.nextSprites();
      });
    } else {
      //console.log("false");
    }

  }
  switchPerso() {
    //TODO : stocker la liste des perso du joueur et prendre dedans
    //console.log( this.hero instanceof Wizard);
    let newHero: Character;
    if (this.hero instanceof Wizard) {
      newHero = new Archer('Legolas');
    } else {
      newHero = new Wizard('Gandalfs');
    }

    newHero.x = this.hero.x;
    newHero.y = this.hero.y;
    this.hero = newHero
  }

}

export default Game;




