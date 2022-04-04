/**
 * Gère l'évolution du jeu en fonction du temps
 */
declare class DeltaTracker {
    private lastTime;
    getAndUpdateDelta(): number;
    /**
     *
     * @returns Le temps actuelle en ms
     */
    private getTimestampMS;
}
export default DeltaTracker;
