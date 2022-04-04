import ImageUtils from "./ImageUtils.js";
import GameMap from "./GameMap.js";
import GameLoop from "./GameLoop.js";
import { Character } from "../character/Character.js";
import { Wizard } from "../character/Wizard.js";
import { Archer } from "../character/Archer.js";
import { Entity } from "../character/Entity.js";
import { Zombie } from "../character/Zombie.js";
import { User } from "../User.js";
import { Warrior } from "../character/Warrior.js";
import { constants } from "fs";
import { url } from "inspector";
import { Stuff } from "../character/stuff/Stuff.js";
import { Item } from "../character/stuff/Item.js";

class Game {

  private canvasEl: HTMLCanvasElement;

  public static context: CanvasRenderingContext2D;
  private width: number;
  private height: number;

  private mobImage: HTMLImageElement;

  public static player: User;
  private hero: Character;
  public static mob: Entity[];
  //private inventory : Inventory;
  /**
   * Deltas en ms depuis le dernier refresh
   */
  private timeSinceLastFPS: number = 0;
  private frame: number = 0;
  private cooldown: number;


  /**
   * Touches sur lesquelles on peut rester appuyé
   * key : name key down,
   * value : isDown ? 
   */
  private keyStates: string[] = [];
  static gameLoop: GameLoop;
  static stuff: Stuff;

  constructor(canvasEl: HTMLCanvasElement, player: User, mob: Entity[] = []) {
    this.canvasEl = canvasEl;
    Game.context = canvasEl.getContext("2d") as CanvasRenderingContext2D;
    this.width = canvasEl.width;
    this.height = canvasEl.height;

    Game.player = player;
    this.hero = player.chars[0];
    this.cooldown = this.hero.attackSpeed;
    Game.mob = mob;
    Game.stuff= new Stuff([new Item('popoXp'),new Item('popoVie') , new Item('popoMana')])
    this.setup()


  }

  public init(this: any): EventListenerOrEventListenerObject {
    return this.setup(this.canvasEl);
  }
    /**
   * setup some action as key Mapping
   */
     private setup() {
      this.hero.updateAffichageStats();
      let frame = 0;
      document.addEventListener("keydown", e => {
        if (!this.keyStates.includes(e.key)) {
          this.keyStates.push(e.key);
        }
      });
  
      document.addEventListener("click", e => {
        console.log("click on : " + e.x, e.y);
  
      });
  
      //Touches que l'on presse simplement pour effectuer UNE action
      document.addEventListener("keypress", e => {
        //console.log(e.key);
  
        switch (e.key) {
          case 'p':
            this.switchPerso();
            this.majDivSpell();
            break;
          case 'b':
            GameMap.previousFloor();
            break;
          case 'n':
            GameMap.nextFloor();
            break;
          case 'k':
            Zombie.isActive = false;
            break;
          case 'l':
            Zombie.isActive = true;
            break;
          case 'm':
            //try
            if (Game.mob[0].addHp(-1) <= 0) {
              Game.mob.splice(0);
              Game.player.updateGold(+5);
            }
            break;
          case 'o':
            Game.mob.push(new Zombie());
            break;
          case 'i':
            console.log('display inventory ?')
            this.displayStuff()
            console.log('display inventory effected')
            break;
          case 'a':
            if (this.cooldown == this.hero.attackSpeed) {
              this.hero.attack();
              this.cooldown = 0;
            }
            break;
          //debug
          case 'h':
            console.log("pos hero : ", this.hero.x, ", ", this.hero.y, "\n",
              "map : ", GameMap.maps, "\n",
              "renderable : ", GameMap.renderable, "\n"
            );
            break;
          case 'j':
            console.log("saving json....");
            async function save() {
              /*
              let url = `http://localhost:8752/json`;
            
                e.preventDefault();
                let response = await fetch(url, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                  }
                });
                */
              let urlSend = `http://localhost:8752/json`
              let xhr = new XMLHttpRequest();
              xhr.open('GET', urlSend);
              xhr.responseType = 'json';
              console.log('url :  ', urlSend);
              xhr.send();
  
            }
            save()
            break;
          case 'x':
            Game.stop();
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

    document.getElementById("div_spell")?.addEventListener('click', () => {
      console.log('pépé')
      document.dispatchEvent(new KeyboardEvent('keypress', {
        'key': 'a'
      }));
    });

    this.majDivSpell();
    GameMap.jsonProceduralMap(0);
    GameMap.jsonProceduralMap(1);
    GameMap.jsonProceduralMap(2);
    GameMap.initMap();

    //Game.mobImage = await ImageUtils.loadImageFromUrl("./assets/img/mob/zombie_sprites.png");
    //this.context.drawImage(Game.mobImage, 3 * 64, 3 * 64);


    Game.gameLoop = new GameLoop(this.loop.bind(this));
    Game.gameLoop.run();
  }

  public static async stop() {
    console.log('stop game');

    Game.gameLoop.stop()

    const logoImage = await ImageUtils.loadImageFromUrl("./assets/img/GameOver.png");
    this.context.drawImage(logoImage, 3 * 64, 3 * 64);
  }

  public pauseGame(){
    if(Game.stuff.visible==false){
      console.log('pause du jeu');
      Game.gameLoop.stop()
      Game.stuff.visible=true;
    }else{
      console.log('reprise du jeu')
      Game.gameLoop = new GameLoop(this.loop.bind(this));
      Game.gameLoop.run()
      Game.stuff.visible=false;

    }
  }



  public async displayStuff() {
    //Met le jeu en pause
      this.pauseGame();
    
    //Recupere l'élément stuff dans le fichier HTML
      let stuffdiv = document.getElementById("stuff")

    //Actualise la liste
      for(let i = 0 ; i < 20 ; i++){
        if(stuffdiv?.firstChild!=null){
          stuffdiv?.removeChild(stuffdiv?.firstChild)
          
        }
      }
      
      //Ouverture de l'inventaire
      if(stuffdiv != null){
        if(stuffdiv.style.display=='none' || stuffdiv.style.display==""){
          stuffdiv.style.display='grid';
          for(let i = 0 ; i < 20 ; i++){
            let slot = document.createElement('div');
            slot.style.margin='5px';
            slot.style.padding='20px';

            if(i < Game.stuff.itemList.length){
              //Potion de vie (rouge) --> rajoute 2 pv au héros si les pv max ne sont pas déjà atteint
              if(Game.stuff.itemList[i].name=='popoVie'){
                slot.style.backgroundImage = "url('./assets/img/stuff/potion/potion_vie.png')";
                slot.addEventListener("click", (e)=>{
                  this.hero.addHp(2);
                  slot.remove();
                  const index = Game.stuff.itemList.indexOf(Game.stuff.itemList[i]);
                  if (index > -1) {
                    Game.stuff.itemList.splice(index, 1); // 2nd parameter means remove one item only
                  }
                  let newslot = document.createElement('div');
                  stuffdiv?.appendChild(newslot);
                })
              }
              //Potion d' xp (verte) --> rajoute de l'xp au héros si l'xp max n'est pas déjà atteint

              if(Game.stuff.itemList[i].name=='popoXp'){
                slot.style.backgroundImage =  "url('./assets/img/stuff/potion/potion_xp.png')";
                slot.addEventListener("click", (e)=>{
                  //this.hero.addHp(2);
                  slot.remove();
                  const index = Game.stuff.itemList.indexOf(Game.stuff.itemList[i]);
                  if (index > -1) {
                    Game.stuff.itemList.splice(index, 1); // 2nd parameter means remove one item only
                  }
                  let newslot = document.createElement('div');
                  stuffdiv?.appendChild(newslot);
                })
                
              }
              //Potion de mana (bleue) --> rajoute du mana au héros si le mana max n'est pas déjà atteint
              if(Game.stuff.itemList[i].name=='popoMana'){
                slot.style.backgroundImage =  "url('./assets/img/stuff/potion/potion_mana.png')";
                slot.addEventListener("click", (e)=>{
                  //this.hero.addMana(4);
                  slot.remove();
                  const index = Game.stuff.itemList.indexOf(Game.stuff.itemList[i]);
                  if (index > -1) {
                    Game.stuff.itemList.splice(index, 1); // 2nd parameter means remove one item only
                  }
                  let newslot = document.createElement('div');
                  stuffdiv?.appendChild(newslot);
                  })
                
              }
            }
            stuffdiv.appendChild(slot)
          }
          //Fermeture de l'inventaire
        }else{
          stuffdiv.style.display='none';

        }
    }
     
  }

  /**
   * Appeler a chaque update du jeu
   * @param delta tmps depuis dernier appel
   */
  public async loop(delta: number) {
    this.timeSinceLastFPS += delta;



    //Détéction des touches et lancement des fonctions associé
    if (this.isAnyKeyDown()) {
      if (this.isKeyDown("d") || this.isKeyDown("ArrowRight")) {
        this.hero.walk(2, delta, Game.mob);
      } else if (this.isKeyDown("q") || this.isKeyDown("ArrowLeft")) {
        this.hero.walk(-2, delta, Game.mob);
      }
      if (this.isKeyDown("s") || this.isKeyDown("ArrowDown")) {
        this.hero.walk(-1, delta, Game.mob);
      } else if (this.isKeyDown("z") || this.isKeyDown("ArrowUp")) {
        this.hero.walk(1, delta, Game.mob);
      }
    }



    //1/60 pour 1 image toutes les 60 secondes
    if (this.timeSinceLastFPS >= 1 / 60) {
      this.timeSinceLastFPS = 0;
      this.frame += 1;
      //redessine la carte
      await GameMap.render(Game.context);
      //redessine le perso
      this.hero.paint(Game.context);

      Game.mob.forEach((entity) => {
        entity.evolve(delta);
        entity.paint(Game.context)
      });
    };

    //1 sprite toute les 8 frames
    if (this.frame === 8) {
      this.frame = 0;
      this.hero.nextSprites();
      Game.mob.forEach((entity) => {
        entity.nextSprites();
      });
      //incrementation du cooldown
      if (this.cooldown < this.hero.attackSpeed) {
        this.cooldown += 0.5;
        this.majDivSpell();
      }

    } else {
      //console.log("false");
    }

  }
  switchPerso() {
    //TODO : stocker la liste des perso du joueur et prendre dedans
    //console.log(Game.player.chars);
    let newHero: Character;
    if (this.hero instanceof Wizard) {
      newHero = new Warrior('Conan');
    }
    else if (this.hero instanceof Warrior) {
      newHero = new Archer();
    }
    else {
      newHero = new Wizard('Gandalfs');
    }

    console.log(newHero);
    newHero.x = this.hero.x;
    newHero.y = this.hero.y;
    this.hero = newHero;
    this.cooldown = this.hero.attackSpeed;
  }
  //met à jour la div du sort (en bas à droite de l'interface)
  majDivSpell() {
    let h2Cooldown = document.getElementById("h2_cooldown");

    if (h2Cooldown != null) {
      h2Cooldown.textContent = this.cooldown.toFixed(1).toString();
    }
    this.majSpellImg(this.hero.spellImg);
  }

  /**
   * met a jour l'image de la div de sort (en bas à droite de l'interface)
   * @param p_spellImg image du sort
   * @param p_rgbaBackColor couleur de fond utilisant la méhode rgba()
   */
  majSpellImg(p_spellImg: string[], p_rgbaBackColor: string = "rgba(125,125,125,") {
    let divSpell = document.getElementById("div_spell");

    if (divSpell != null) {
      if (this.cooldown < this.hero.attackSpeed)
        divSpell.style.backgroundColor = p_rgbaBackColor + "0.5)";
      else
        divSpell.style.backgroundColor = p_rgbaBackColor + "1)";
      divSpell.style.backgroundImage = "url('" + p_spellImg[0] + "'), url('')";
    }
  }


}

export default Game;




