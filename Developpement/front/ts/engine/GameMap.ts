import ImageUtils  from "./ImageUtils";
import fs from 'fs';
//import ErrnoException from 'fs';
//import readFile from "fs/promises";
//import writeFile from "fs/promises";
//import  * as floors from "../map/map.json";

class GameMap {
  /**
   * Texture de la case
   */

  private maps: Block[][];

  constructor() {
  }

  public getMaps():Block[][]{
    return this.maps;
  }

  public setMaps(p_maps:Block[][]){
    this.maps = p_maps;
  }

  public getBlock(p_x:number, p_y:number):Block{
    return this.maps[p_x][p_y];
  }

  public setBlock(p_x:number, p_y:number, p_block:Block){
    this.maps[p_x][p_y] = p_block;
  }

  public async deleteBlock(p_x:number, p_y:number){
    let nullBlock = this.getBlock(p_x, p_y); 
    let nullImg = await ImageUtils.loadImageFromUrl("./assets/img/map/dirt.jpg")
    this.maps[p_x][p_y] = new Block(nullBlock.getBlockX(),
                                      nullBlock.getBlockY(),
                                      nullBlock.getWidth(),
                                      nullBlock.getHeight(),
                                      false, 
                                      nullImg);
  }

  public ajoutBlock(p_block:Block){
    if (this.maps[this.maps.length].length === this.maps[this.maps.length-1].length){
      this.maps[this.maps.length+1][0] = p_block;
    }
    else{
      this.maps[this.maps.length].push(p_block);
    }
  }


  /**
   * Redessinne la carte
   * @param context objet html ou dessiner : Canva 2D
   */
  public render(context: CanvasRenderingContext2D) {
    const tileSize = 64;
    
    const tileCountX = Math.ceil(this.maps.length);
    const tileCountY = Math.ceil(this.maps[0].length);

    for (let y = 0; y < tileCountY; y++) {
      for (let x = 0; x < tileCountX; x++) {
        context.drawImage(this.maps[x][y].getImg(), x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }
  }

  /**
   * Init a map from a JSON File
   * @param floorNumber number of the floor
   */
  initMap(floorNumber: number) {
  
    //let fs = require('fs');
    let menObject = 0;
    // Handle the data 
    let handleJSONFile = function (err: NodeJS.ErrnoException | null, data: Buffer) {
      if (err) {
          throw err;
      }
      menObject = JSON.parse(data.toString());
    }
    
    // Read the file, and pass it to your callback
    
    fs.readFile('../map/map.json', handleJSONFile);
    
  
    console.log(menObject);
    
  }

  
}

export default GameMap;
