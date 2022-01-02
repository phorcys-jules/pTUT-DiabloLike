declare class DeltaTracker {
    private lastTime;
    getAndUpdateDelta(): number;
    private getTimestampMS;
}
export default DeltaTracker;
