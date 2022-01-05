
class ImageUtils {

  public static loadImageFromUrl(url: string): Promise<HTMLImageElement> {
    //TODO : if image not found, return null.png
    return new Promise(resolve => {
      const img = new Image()
      img.onload = () => {
        resolve(img);
      }
      img.src = url;
    })
  }
  
}

export default ImageUtils;
