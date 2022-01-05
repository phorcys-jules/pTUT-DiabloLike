
class GameMap {

  /**
   * Texture de la case
   */
  private tileImage: HTMLImageElement;
  private borderImage: HTMLImageElement;
  private wallImage: HTMLImageElement;
  private width: number;
  private height: number;

  constructor(tileImage: HTMLImageElement, borderImage: HTMLImageElement, wallImage : HTMLImageElement, width: number, height: number) {
    this.tileImage = tileImage;
    this.borderImage = borderImage;
    this.wallImage = wallImage;
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

    for (let y = 1; y < tileCountY-1; y++) {
      for (let x = 1; x < tileCountX-1; x++) {
        context.drawImage(this.tileImage, x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }
    for (let y = 0; y < tileCountY; y++){
      context.drawImage(this.borderImage, 0 * tileSize, y * tileSize, tileSize, tileSize);
      context.drawImage(this.borderImage, (tileCountX-1) * tileSize, y * tileSize, tileSize, tileSize);
    }
    for (let x = 0; x < tileCountX; x++){
      context.drawImage(this.borderImage, x * tileSize, 0 * tileSize, tileSize, tileSize);
      context.drawImage(this.borderImage, x * tileSize, (tileCountY-1) * tileSize, tileSize, tileSize);
    }
  }
  
}

export default GameMap;
