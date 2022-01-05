/**
 * Gère l'évolution du jeu en fonction du temps
 */
class DeltaTracker {

  private lastTime: number | undefined

  public getAndUpdateDelta() {
    if (this.lastTime == null) {
      this.lastTime = this.getTimestampMS();
      return 0
    }
    
    const currentTime = this.getTimestampMS();
    // delta => time since last frame in seconds
    const delta = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;
    return delta;
  }

  /**
   * 
   * @returns Le temps actuelle en ms
   */
  private getTimestampMS() {
    return (new Date()).getTime();
  }
  
}

export default DeltaTracker;
