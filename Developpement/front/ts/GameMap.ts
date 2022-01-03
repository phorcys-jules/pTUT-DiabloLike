
class GameMap {

  /**
   * Texture de la case
   */
  private tileImage: HTMLImageElement;
  private width: number;
  private height: number;

  constructor(tileImage: HTMLImageElement, width: number, height: number) {
    this.tileImage = tileImage;
    this.width = width;
    this.height = height;
  }

  /**
   * Redessinne la carte
   * @param context objet html ou dessiner : Canva 2D
   */
  public render(context: CanvasRenderingContext2D) {
    const tileSize = 64;
    
    const tileCountX = Math.ceil(this.width / tileSize);
    const tileCountY = Math.ceil(this.height / tileSize);

    for (let y = 0; y < tileCountY; y++) {
      for (let x = 0; x < tileCountX; x++) {
        context.drawImage(this.tileImage, x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }
  }
  
}

export default GameMap;
