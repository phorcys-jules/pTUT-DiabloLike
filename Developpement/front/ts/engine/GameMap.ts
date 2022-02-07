import ImageUtils from "./ImageUtils.js";
//import fs from "fs/promises";
//import readFile from "fs";
//import ErrnoException from 'fs';
//import readFile from "fs/promises";
//import writeFile from "fs/promises";import { Block } from "../map/block.js";
import { Block } from "../map/block.js";

import jSONmap from "../map/map.json" assert { type: "json" };

class GameMap {
  /**
   * Texture de la case
   */

  private maps: Block[][];
  private itemMaps: Block[];
  private width: number;
  private height: number;



  constructor() {
    this.maps = [[]];
    this.itemMaps = [];
    this.width = 0;
    this.height = 0;
  }

  public getMaps(): Block[][] {
    return this.maps;
  }

  public setMaps(p_maps: Block[][]) {
    this.maps = p_maps;
  }

  public getBlock(p_x: number, p_y: number): Block {
    return this.maps[p_x][p_y];
  }

  public setBlock(p_x: number, p_y: number, p_block: Block) {
    this.maps[p_x][p_y] = p_block;
  }

  public async deleteBlock(p_x: number, p_y: number) {
    let nullBlock = this.getBlock(p_x, p_y);
    this.maps[p_x][p_y] = new Block(nullBlock.getBlockX(),
      nullBlock.getBlockY(),
      nullBlock.getWidth(),
      nullBlock.getHeight(),
      false,
      "nullImg");
  }

  public ajoutBlock(p_block: Block) {
    if (this.maps[this.height - 1].length < this.width) {
      this.maps[this.height - 1].push(p_block);
    } else { //si on a remplit la ligne, on en crée une nouvelle
      this.height++;
      this.maps.push([]);
      this.maps[this.height - 1].push(p_block);
    }
  }


  /**
   * Redessinne la carte
   * @param context objet html ou dessiner : Canva 2D
   */
  public async render(context: CanvasRenderingContext2D) {
    const tileSize = 64;

    let bl;

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        bl = this.maps[y][x];
        context.drawImage(await bl.getImg(), bl.dx, bl.dy, bl.dw, bl.dh, x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }

    this.itemMaps.forEach(async itm => {
      context.drawImage(await itm.getImg(), itm.dx, itm.dy, itm.dw, itm.dh, itm.blockX * tileSize, itm.blockY * tileSize, itm.width, itm.height)
    });

    //render items
  }

  /**
   * Init a map from a JSON File
   * @param floorNumber number of the floor
   */
  initMap(floorNumber: number) {
    this.height = 1;
    this.width = jSONmap.floors[floorNumber].map[this.height - 1].length;
    let currentX: number = 0;
    let toPush: Block;
    let nb: number = 0;
    let tile: number[];
    let item: boolean;
    //On itère sur tableau correspondant à l'étge courant
    jSONmap.floors[floorNumber].map.forEach(el => {
      el.forEach(async bl => {
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
            toPush = new Block(0, 0, 64, 64, false, "./assets/img/map/AssetsDG.png", tile[0], tile[1], tile[2], tile[3]);
            break;
          case 6:
            item = true;
            tile = Block.STAIR_UR;
            toPush = new Block(currentX, this.height - 1, 64, 64, false, "./assets/img/map/AssetsDG.png", tile[0], tile[1], tile[2], tile[3]);
            break;
          case 7:
          case 8:
          case 9:
          case 10:
          case 12:
            tile = Block.WALL[bl - 7];
            toPush = new Block(0, 0, 64, 64, false, "./assets/img/map/AssetsDG.png", tile[0], tile[1], tile[2], tile[3]);
            break;

          case 11:
            item = true;
            tile = Block.WALL[bl - 7];
            toPush = new Block(currentX, this.height, 32, 64, false, "./assets/img/map/AssetsDG.png", tile[0], tile[1], tile[2], tile[3]);
            break;
          case 13:
            item = true;
            tile = Block.WALL[bl - 7];
            toPush = new Block(currentX+0.5, this.height-1, 32, 64, false, "./assets/img/map/AssetsDG.png", tile[0], tile[1], tile[2], tile[3]);
            break;
          case 14:
            item = true;
            tile = Block.CHEST;
            toPush = new Block(currentX, this.height-1, 64, 64, false, "./assets/img/map/Dungeon_deco.png", tile[0], tile[1], tile[2], tile[3]);
            break;

            

          default:
            toPush = new Block(0, 0, 64, 64, false, "./assets/img/map/border.jpg");

            console.log("Ce Block n'est pas reconnu : ", bl);

            break;
        }
        currentX++;
        nb++;

        //L'item se pose par dessus un block basique
        if (item === true) {
          item = false;
          this.itemMaps.push(toPush);
          tile = Block.FLOOR[1];
          toPush = new Block(0, 0, 64, 64, false, "./assets/img/map/AssetsDG.png", tile[0], tile[1], tile[2], tile[3])
        }
        this.ajoutBlock(toPush);
      });
      currentX = 0;

    });
    //console.log( 'floor : ', jSONmap.floors[0].map);
    console.log("we create a map of ", this.width, this.height, "sizing ", nb);
    console.log(this.maps);



  }
  getCurrentTime() {
    throw new Error("Method not implemented.");
  }

}


export default GameMap;

function async(async: any, arg1: { switch(): any; case: any; }) {
  throw new Error("Function not implemented.");
}
