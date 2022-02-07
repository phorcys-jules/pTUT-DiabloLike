
class ImageUtils {

  public static loadImageFromUrl(url: string): Promise<HTMLImageElement> {
    //TODO : if image not found, return null.png
    let pr:Promise<HTMLImageElement> = new Promise(resolve => {
      const img = new Image()
      img.onload = () => {
        resolve(img);
      }
      img.src = url;
    })
    pr.catch((error) => {
      console.error(error);
    });
    return pr;
  }
  
}

export default ImageUtils;
