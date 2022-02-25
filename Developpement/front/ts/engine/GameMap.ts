import { Block } from "../map/block.js";

import jSONmap from "../map/map.json" assert { type: "json" };
import { GameImage } from "../map/GameImage.js";
import { Stair } from "../map/Stair.js";
import Game from "./Game.js";
import { Zombie } from "../character/Zombie.js";



class GameMap {
  /**
   * Texture de la case
   */

  static maps: Block[][];
  static width: number;
  static height: number;
  public static currentFloor: number = 0;

  public static renderable: { (): void; }[] = [];



  constructor() {
    GameMap.maps = [[]];
    GameMap.width = 0;
    GameMap.height = 0;
  }

  public deleteBlock(p_x: number, p_y: number) {
    let nullBlock = GameMap.maps[p_x][p_y];
    GameMap.maps[p_x][p_y] = new Block(nullBlock.getBlockX(),
      nullBlock.getBlockY(),
      nullBlock.getWidth(),
      nullBlock.getHeight(),
      false,
      []);
  }

  public static ajoutBlock(p_block: Block) {
    if (GameMap.maps[GameMap.height - 1].length < GameMap.width) {
      p_block.blockY = GameMap.height - 1;
      p_block.blockX = GameMap.maps[GameMap.height - 1].length;
      GameMap.maps[GameMap.height - 1].push(p_block);
    } else { //si on a remplit la ligne, on en crée une nouvelle
      GameMap.height++;
      GameMap.maps.push([]);
      p_block.blockY = GameMap.height - 1;
      p_block.blockX = GameMap.maps[GameMap.height - 1].length;
      GameMap.maps[GameMap.height - 1].push(p_block);
    }
  }

  public static nextFloor() {
    if (GameMap.currentFloor < 2) {
      GameMap.currentFloor++;
      GameMap.initMap()
    }
  }
  public static previousFloor() {
    if (GameMap.currentFloor > 0) {
      GameMap.currentFloor--;
      GameMap.initMap()
    }
  }

  /**
   * Redessinne la carte
   * @param context objet html ou dessiner : Canva 2D
   */
  public static async render(context: CanvasRenderingContext2D) {
    const tileSize = 64;

    let bl: Block;

    for (let x = 0; x < GameMap.width; x++) {
      for (let y = 0; y < GameMap.height; y++) {
        bl = GameMap.maps[y][x];
        bl.img.forEach(async i => {
          try {
            context.drawImage(await i.getImg(), i.dx, i.dy, i.dw, i.dh, (x + i.X) * tileSize, (y + i.Y) * tileSize, i.width, i.height);
            GameMap.renderable.forEach(element => {
              element();
              console.log("renderable");

            });
            //console.log(GameMap.renderable);
          } catch { }
        });
      }
    }
  }

  /**
   * Init a map from a JSON File
   */
  public static initMap() {
    //On reset la map
    GameMap.maps = [[]];
    GameMap.height = 1;
    GameMap.width = jSONmap.floors[GameMap.currentFloor].map[GameMap.height - 1].length;


    let toPush: Block;
    let nb: number = 0;
    let tile: number[];
    let item: boolean;

    GameMap.jsonProceduralMap();
    
    //On rècupère le thème de l'étage
    let theme: string = jSONmap.floors[GameMap.currentFloor].theme;


    //case par défaut à mettre sous les items (coffre escalier....) qui n'occupe pas une case entière
    tile = Block.FLOOR[1];
    let defaultImage: GameImage = new GameImage(0, 0, 64, 64, theme, tile[0], tile[1], tile[2], tile[3]);
    let voidImage: GameImage = new GameImage(0, 0, 64, 64, theme, 0, 0, 0, 0);

    let dY = 0;
    //On itère sur tableau correspondant à l'étge courant
    jSONmap.floors[GameMap.currentFloor].map.forEach(el => {
      el.forEach(async bl => {
        if (bl < -1) { dY = -1; bl = -bl; } else { dY = 0; }
        //toPush = new Block(0, 0, 64, 64, false, "./assets/img/map/dirt.jpg");
        //toPush = new Block(0, 0, 64, 64, false, "./assets/img/map/border.jpg");
        switch (bl) {
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            tile = Block.FLOOR[bl];
            toPush = new Block(0, 0, 64, 64, false, [new GameImage(0, 0, 64, 64, theme, tile[0], tile[1], tile[2], tile[3])]);
            break;
          case 6:
            item = true;
            tile = Block.STAIR_UR;
            toPush = new Stair(0, dY - 1, 64, 64, false, [new GameImage(0, dY, 64, 64, theme, Block.FLOOR[1][0], Block.FLOOR[1][1], Block.FLOOR[1][2], Block.FLOOR[1][3]),
            new GameImage(0, dY, 64, 64, theme, tile[0], tile[1], tile[2], tile[3])]);
            break;
          case 7:
          case 8:
          case 9:
          case 10:
          case 12:
            tile = Block.WALL[bl - 7];
            toPush = new Block(0, 0, 64, 64, false, [new GameImage(0, 0, 64, 64, theme, tile[0], tile[1], tile[2], tile[3])]);
            break;

          case 11:
            item = true;
            tile = Block.WALL[bl - 7];
            toPush = new Block(0, 0, 32, 64, true, [defaultImage, new GameImage(0, 0, 32, 64, theme, tile[0], tile[1], tile[2], tile[3])]);
            break;
          case 13:
            item = true;
            tile = Block.WALL[bl - 7];
            toPush = new Block(0 + 0.5, 0 - 1, 32, 64, true, [defaultImage, new GameImage(0.5, 0, 32, 64, theme, tile[0], tile[1], tile[2], tile[3])]);
            break;
          case 14:
            tile = Block.WALL[1];
            toPush = new Block(0, 1, 64, 64, true, [new GameImage(0, 0, 64, 64, theme, Block.FLOOR[1][0], Block.FLOOR[1][1], Block.FLOOR[1][2], Block.FLOOR[1][3]),
            new GameImage(0, 0, 64, 64, theme, tile[0], tile[1], tile[2], tile[3])]);
            break;
          case 15:
            item = true;
            tile = Block.CHEST;
            toPush = new Block(0, dY - 1, 64, 64, true, [new GameImage(0, dY, 64, 64, theme, Block.FLOOR[1][0], Block.FLOOR[1][1], Block.FLOOR[1][2], Block.FLOOR[1][3]),
            new GameImage(0, dY, 64, 64, "./assets/img/map/Dungeon_deco.png", tile[0], tile[1], tile[2], tile[3])]);
            break;



          default:
            toPush = new Block(0, 0, 64, 64, false, [voidImage]);

            console.log("Ce Block n'est pas reconnu : ", bl);

            break;
        }
        nb++;

        GameMap.ajoutBlock(toPush);

      });

    });
    //console.log( 'floor : ', jSONmap.floors[0].map);
    console.log("we create a map of ", GameMap.width, GameMap.height, "sizing ", nb);
    console.log(GameMap.maps);

    Game.mob = [];
    jSONmap.floors[this.currentFloor].mobPos.forEach(pos => {
      let tempZomb = new Zombie();
      tempZomb.x = pos[0];
      tempZomb.y = pos[1];
      Game.mob.push(tempZomb);
    });
  }



  public static jsonProceduralMap() {
    let nbCoffre = Math.round(Math.random() * 3);
    let nbZombie = Math.round(Math.random() * 3);
    let tabPositionElementParticulier:number[][][] = [[],[],[]];
    let different;

    //boucle calcule positions coffres
    for (let c = 0; c < nbCoffre; c++) {
      let x = Math.round((Math.random() * 18) + 0.5);
      let y = Math.round((Math.random() * 12) + 0.5);
      different = false;
      while (!different) {
        console.log("1");
        if (tabPositionElementParticulier[0].length === 0)
          different = true;
        tabPositionElementParticulier[0].forEach(pos => {
          if (
            (pos[0] !== x && pos[1] !== y) &&
            (pos[0] !== x + 1 && pos[1] !== y) &&
            (pos[0] !== x - 1 && pos[1] !== y) &&
            (pos[0] !== x && pos[1] !== y + 1) &&
            (pos[0] !== x && pos[1] !== y - 1) &&
            (pos[0] !== x + 1 && pos[1] !== y + 1) &&
            (pos[0] !== x + 1 && pos[1] !== y - 1) &&
            (pos[0] !== x - 1 && pos[1] !== y + 1) &&
            (pos[0] !== x - 1 && pos[1] !== y - 1))
            different = true;
          else {
            x = Math.round((Math.random() * 18) + 0.5);
            y = Math.round((Math.random() * 12) + 0.5);
          }
        });
      }
      tabPositionElementParticulier[0].push([x, y]);
    }

    //boucle calcule positions zombies
    for (let z = 0; z < nbZombie; z++) {
      let x = Math.round((Math.random() * 18) + 0.5);
      let y = Math.round((Math.random() * 12) + 0.5);
      different = false;
      while (!different) {
        console.log("2");
        if (tabPositionElementParticulier[0].length === 0)
          different = true;
        tabPositionElementParticulier[0].forEach(pos => {
          if (pos[0] !== x && pos[1] !== y)
            different = true;
        });
        tabPositionElementParticulier[1].forEach(pos => {
          if (pos[0] !== x && pos[1] !== y)
            different = true;
        });
        if (!different) {
          x = Math.round((Math.random() * 18) + 0.5);
          y = Math.round((Math.random() * 12) + 0.5);
        }
      }
      tabPositionElementParticulier[1].push([x, y]);
    }

    //boucle calcule positions escaliers
    for (let e = 0; e < 2; e++) {
      let x = Math.round((Math.random() * 18) + 0.5);
      let y = Math.round((Math.random() * 12) + 0.5);
      different = false;
      while (!different) {
        console.log("3");
        if (tabPositionElementParticulier[0].length === 0 && tabPositionElementParticulier[1].length === 0)
          different = true;
        tabPositionElementParticulier[0].forEach(pos => {
          if (pos[0] !== x && pos[1] !== y)
            different = true;
        });
        tabPositionElementParticulier[1].forEach(pos => {
          if (pos[0] !== x && pos[1] !== y)
            different = true;
        });
        tabPositionElementParticulier[2].forEach(pos => {
          if (
            (pos[0] !== x && pos[1] !== y) &&
            (pos[0] !== x + 1 && pos[1] !== y) &&
            (pos[0] !== x - 1 && pos[1] !== y) &&
            (pos[0] !== x && pos[1] !== y + 1) &&
            (pos[0] !== x && pos[1] !== y - 1) &&
            (pos[0] !== x + 1 && pos[1] !== y + 1) &&
            (pos[0] !== x + 1 && pos[1] !== y - 1) &&
            (pos[0] !== x - 1 && pos[1] !== y + 1) &&
            (pos[0] !== x - 1 && pos[1] !== y - 1))
            different = true;
        });
        if (!different) {
          x = Math.round((Math.random() * 18) + 0.5);
          y = Math.round((Math.random() * 12) + 0.5);
        }
      }
      tabPositionElementParticulier[2].push([x, y]);
    }

    let tabMap = [
      [7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9],
      [11, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 13],
      [11, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 13],
      [11, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 13],
      [11, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 13],
      [11, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 13],
      [11, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 13],
      [11, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 13],
      [11, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 13],
      [11, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 13],
      [11, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 13],
      [11, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 13],
      [11, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 13],
      [12, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 10]
  ];
  
  //ajout coffres et escaliers a la map
  tabPositionElementParticulier[0].forEach(pos => {
    tabMap[pos[1]][pos[0]] = 15; 
  });
  tabPositionElementParticulier[2].forEach(pos => {
    tabMap[pos[1]][pos[0]] = 6; 
  });

  //ajout informations au json au json
  jSONmap.floors[this.currentFloor].map = tabMap;
  jSONmap.floors[this.currentFloor].mobPos = tabPositionElementParticulier[1];
  }

  getCurrentTime() {
    throw new Error("Method not implemented.");
  }

}


export default GameMap;

