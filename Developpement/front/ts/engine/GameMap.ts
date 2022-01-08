import ImageUtils  from "./ImageUtils.js";

class GameMap {

  /**
   * Texture de la case
   */

  private blocks: Block[][];

  constructor() {
  }

  public getBlocks():Block[][]{
    return this.blocks;
  }

  public setBlocks(p_blocks:Block[][]){
    this.blocks = p_blocks;
  }

  public getBlock(p_x:number, p_y:number):Block{
    return this.blocks[p_x][p_y];
  }

  public setBlock(p_x:number, p_y:number, p_block:Block){
    this.blocks[p_x][p_y] = p_block;
  }

  public async deleteBlock(p_x:number, p_y:number){
    let nullBlock = this.getBlock(p_x, p_y); 
    let nullImg = await ImageUtils.loadImageFromUrl("./assets/img/map/dirt.jpg")
    this.blocks[p_x][p_y] = new Block(nullBlock.getBlockX(),
                                      nullBlock.getBlockY(),
                                      nullBlock.getWidth(),
                                      nullBlock.getHeight(),
                                      false, 
                                      nullImg);
  }

  public ajoutBlock(p_block:Block){
    if (this.blocks[this.blocks.length].length === this.blocks[this.blocks.length-1].length){
      this.blocks[this.blocks.length+1][0] = p_block;
    }
    else{
      this.blocks[this.blocks.length].push(p_block);
    }
  }


  /**
   * Redessinne la carte
   * @param context objet html ou dessiner : Canva 2D
   */
  public render(context: CanvasRenderingContext2D) {
    const tileSize = 64;
    
    const tileCountX = Math.ceil(this.blocks.length);
    const tileCountY = Math.ceil(this.blocks[0].length);

    for (let y = 0; y < tileCountY; y++) {
      for (let x = 0; x < tileCountX; x++) {
        context.drawImage(this.blocks[x][y].getImg(), x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }
  }
  
}

export default GameMap;
