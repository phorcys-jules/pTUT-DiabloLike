class DeltaTracker {
    getAndUpdateDelta() {
        if (this.lastTime == null) {
            this.lastTime = this.getTimestampMS();
            return 0;
        }
        const currentTime = this.getTimestampMS();
        // delta => time since last frame in seconds
        const delta = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;
        return delta;
    }
    getTimestampMS() {
        return (new Date()).getTime();
    }
}
export default DeltaTracker;
