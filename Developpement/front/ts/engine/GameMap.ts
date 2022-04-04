import { Block } from "../map/block.js";
import jSONmap from "../data/map.json" assert { type: "json" };
import { GameImage } from "../map/GameImage.js";
import { Stair } from "../map/Stair.js";
import Game from "./Game.js";
import { Zombie } from "../character/Zombie.js";
import { Console } from "console";



class GameMap {
  /**
   * Texture de la case
   */

  static maps: Block[][];
  static width: number;
  static height: number;

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
    let length = jSONmap.floors[0].map.length;
    //étage 0 deviens l'étage 1
    for (let i = 0; i < length; i++) {
      jSONmap.floors[0].map.splice(i, 1, jSONmap.floors[1].map[i])
    }
    for (let i = 0; i < 3; i++) {
      jSONmap.floors[0].mobPos.splice(i, 1, jSONmap.floors[1].mobPos[i])
    }
    jSONmap.floors[0].theme = jSONmap.floors[1].theme;

    //étage 1 deviens l'étage 2
    for (let i = 0; i < length; i++) {
      jSONmap.floors[1].map.splice(i, 1, jSONmap.floors[2].map[i])
    }
    for (let i = 0; i < 3; i++) {
      jSONmap.floors[1].mobPos.splice(i, 1, jSONmap.floors[2].mobPos[i])
    }
    jSONmap.floors[1].theme = jSONmap.floors[2].theme;

    GameMap.jsonProceduralMap(2);
    GameMap.initMap();
  }
  public static previousFloor() {
    let length = jSONmap.floors[0].map.length;
    //étage 2 deviens l'étage 1
    for (let i = 0; i < length; i++) {
      jSONmap.floors[2].map.splice(i, 1, jSONmap.floors[1].map[i])
    }
    for (let i = 0; i < 3; i++) {
      jSONmap.floors[2].mobPos.splice(i, 1, jSONmap.floors[1].mobPos[i])
    }
    jSONmap.floors[2].theme = jSONmap.floors[1].theme;

    //étage 1 deviens l'étage 0
    for (let i = 0; i < length; i++) {
      jSONmap.floors[1].map.splice(i, 1, jSONmap.floors[0].map[i])
    }
    for (let i = 0; i < 3; i++) {
      jSONmap.floors[1].mobPos.splice(i, 1, jSONmap.floors[0].mobPos[i])
    }
    jSONmap.floors[1].theme = jSONmap.floors[0].theme;

    GameMap.jsonProceduralMap(0);
    GameMap.initMap();
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
              //console.log("renderable");

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
    GameMap.width = jSONmap.floors[1].map[GameMap.height - 1].length;


    let toPush: Block;
    let nb: number = 0;
    let tile: number[];
    let item: boolean;

    //On rècupère le thème de l'étage
    let theme: string = jSONmap.floors[1].theme;


    //case par défaut à mettre sous les items (coffre escalier....) qui n'occupe pas une case entière
    tile = Block.FLOOR[1];
    let defaultImage: GameImage = new GameImage(0, 0, 64, 64, theme, tile[0], tile[1], tile[2], tile[3]);
    let voidImage: GameImage = new GameImage(0, 0, 64, 64, theme, 0, 0, 0, 0);

    let dY = 0;
    //On itère sur tableau correspondant à l'étage courant
    jSONmap.floors[1].map.forEach(el => {
      el.forEach(async bl => {
        if (bl < -1) { dY = -1; bl = -bl; } else { dY = 0; }
        //toPush = new Block(0, 0, 64, 64, false, "./assets/img/map/dirt.jpg");
        //toPush = new Block(0, 0, 64, 64, false, "./assets/img/map/border.jpg");
        switch (bl) {
          case 0:
            tile = Block.FLOOR[0];
            toPush = new Block(0, 0, 64, 64, false, [new GameImage(0, 0, 64, 64, theme, tile[0], tile[1], tile[2], tile[3])]);
            break;
          case 1:
            tile = Block.FLOOR[1];
            toPush = new Block(0, 0, 64, 64, false, [new GameImage(0, 0, 64, 64, theme, tile[0], tile[1], tile[2], tile[3])]);
            break;
          case 2:
            tile = Block.FLOOR[2];
            toPush = new Block(0, 0, 64, 64, false, [new GameImage(0, 0, 64, 64, theme, tile[0], tile[1], tile[2], tile[3])]);
            break;
          case 3:
            tile = Block.FLOOR[3];
            toPush = new Block(0, 0, 64, 64, false, [new GameImage(0, 0, 64, 64, theme, tile[0], tile[1], tile[2], tile[3])]);
            break;
          case 4:
            tile = Block.FLOOR[4];
            toPush = new Block(0, 0, 64, 64, false, [new GameImage(0, 0, 64, 64, theme, tile[0], tile[1], tile[2], tile[3])]);
            break;
          case 5:
            tile = Block.FLOOR[5];
            toPush = new Block(0, 0, 64, 64, false, [new GameImage(0, 0, 64, 64, theme, tile[0], tile[1], tile[2], tile[3])]);
            break;
          case 6:
            item = true;
            tile = Block.STAIR_UR;
            toPush = new Stair(0, dY - 1, 64, 64, false, [new GameImage(0, dY, 64, 64, theme, Block.FLOOR[1][0], Block.FLOOR[1][1], Block.FLOOR[1][2], Block.FLOOR[1][3]),
            new GameImage(0, dY, 64, 64, theme, tile[0], tile[1], tile[2], tile[3])], "up");
            break;
          case 7:
            item = true;
            tile = Block.STAIR_DL;
            toPush = new Stair(0, dY - 1, 64, 64, false, [new GameImage(0, dY, 64, 64, theme, Block.FLOOR[1][0], Block.FLOOR[1][1], Block.FLOOR[1][2], Block.FLOOR[1][3]),
            new GameImage(0, dY, 64, 64, theme, tile[0], tile[1], tile[2], tile[3])], "down");
            break;
          case 8:
            tile = Block.WALL_UL;
            toPush = new Block(0, 0, 64, 64, false, [new GameImage(0, 0, 64, 64, theme, tile[0], tile[1], tile[2], tile[3])]);
            break;
          case 9:
            tile = Block.WALL_UR;
            toPush = new Block(0, 0, 64, 64, false, [new GameImage(0, 0, 64, 64, theme, tile[0], tile[1], tile[2], tile[3])]);
            break;
          case 10:
            tile = Block.WALL_DR;
            toPush = new Block(0, 0, 64, 64, false, [new GameImage(0, 0, 64, 64, theme, tile[0], tile[1], tile[2], tile[3])]);
            break;
          case 11:
            tile = Block.WALL_DL;
            toPush = new Block(0, 0, 64, 64, false, [new GameImage(0, 0, 64, 64, theme, tile[0], tile[1], tile[2], tile[3])]);
            break;
          case 12:
            item = true;
            tile = Block.WALL_U_D;
            toPush = new Block(0, 0, 64, 64, true, [new GameImage(0, 0, 64, 64, theme, tile[0], tile[1], tile[2], tile[3])]);
            break;
          case 13:
            item = true;
            tile = Block.WALL_R;
            toPush = new Block(0, 0, 64, 64, true, [new GameImage(0, 0, 64, 64, theme, tile[0], tile[1], tile[2], tile[3])]);
            break;
          case 14:
            item = true;
            tile = Block.WALL_L;
            toPush = new Block(0, 0, 64, 64, true, [new GameImage(0, 0, 64, 64, theme, tile[0], tile[1], tile[2], tile[3])]);
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
    //console.log("we create a map of ", GameMap.width, GameMap.height, "sizing ", nb);
    //console.log(GameMap.maps);

    Game.mob = [];
    jSONmap.floors[1].mobPos.forEach(pos => {
      if (pos[0] !== 0 && pos[1] !== 0) {
        let tempZomb = new Zombie();
        tempZomb.x = pos[0] * 64;
        tempZomb.y = pos[1] * 64;
        Game.mob.push(tempZomb);
      }
    });
  }



  public static jsonProceduralMap(numFloor: number) {
    let nbCoffre = Math.round(Math.random() * 3);
    let nbZombie = Math.round(Math.random() * 3);
    let numTheme = Math.round(Math.random() * 3);
    let tabPositionElementParticulier: number[][][] = [[], [], []];
    let different;

    //choix theme map
    switch (numTheme) {
      case 1:
        jSONmap.floors[numFloor].theme = "./assets/img/map/AssetsDG.png";
        break;
      case 2:
        jSONmap.floors[numFloor].theme = "./assets/img/map/AssetsDG2.png";
        break;
      case 3:
        jSONmap.floors[numFloor].theme = "./assets/img/map/AssetsDG3.png";
        break;
    }

    //boucle calcule positions coffres
    for (let c = 0; c < nbCoffre; c++) {
      let x = Math.round((Math.random() * 18) + 0.5);
      let y = Math.round((Math.random() * 12) + 0.5);
      different = false;
      while (!different) {
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
    for (let z = 0; z < 3; z++) {
      let x: number;
      let y: number;

      if (z < nbZombie) {
        x = Math.round((Math.random() * 18) + 0.5);
        y = Math.round((Math.random() * 12) + 0.5);
        different = false;
        while (!different) {
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
      }
      else {
        x = 0;
        y = 0;
      }
      tabPositionElementParticulier[1].push([x, y]);
    }

    //boucle calcule positions escaliers
    for (let e = 0; e < 2; e++) {
      let x = Math.round((Math.random() * 18) + 0.5);
      let y = Math.round((Math.random() * 12) + 0.5);
      different = false;
      while (!different) {
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

    let tabMap: number[][];
    tabMap = [];
    let tabTemp: number[];
    //ajout du sol
    for (let i = 1; i < 13; i++) {
      tabTemp = [];
      for (let j = 1; j < 19; j++) {
        tabTemp.push(Math.round(Math.random() * 6 + 0.5) - 1)
      }
      tabMap.push(tabTemp);
    }
    //ajout des bordures droites et gauches
    for (let i = 0; i < 12; i++) {
      tabMap[i].splice(0, 0, 14);
      tabMap[i].splice(19, 0, 13);
    }
    //ajout des bodures haut et bas et des angles
    let haut = [8, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 9];
    let bas = [11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 10];
    tabMap.splice(0, 0, haut);
    tabMap.splice(19, 0, bas);

    console.log(tabMap)

    /**
    let tabMap2 = [
      [8, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 9],
      [14, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 13],
      [14, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 13],
      [14, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 13],
      [14, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 13],
      [14, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 13],
      [14, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 13],
      [14, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 13],
      [14, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 13],
      [14, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 13],
      [14, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 13],
      [14, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 13],
      [14, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 13],
      [11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 10]
    ];
    */

    //ajout coffres et escaliers a la map
    tabPositionElementParticulier[0].forEach(pos => {
      tabMap[pos[1]][pos[0]] = 15;
    });

    let diffEscalier = Math.round(Math.random());
    tabPositionElementParticulier[2].forEach(pos => {
      if (diffEscalier == 0) {
        tabMap[pos[1]][pos[0]] = 6;
        diffEscalier++;
      }
      else if (diffEscalier == 1) {
        tabMap[pos[1]][pos[0]] = 7;
        diffEscalier--;
      }
    });

    //ajout informations au json
    let length = jSONmap.floors[0].map.length;
    for (let i = 0; i < length; i++) {
      jSONmap.floors[numFloor].map.splice(i, 1, tabMap[i])
    }
    for (let i = 0; i < 3; i++) {
      jSONmap.floors[numFloor].mobPos.splice(i, 1, tabPositionElementParticulier[1][i])
    }
  }

  getCurrentTime() {
    throw new Error("Method not implemented.");
  }

}


export default GameMap;

