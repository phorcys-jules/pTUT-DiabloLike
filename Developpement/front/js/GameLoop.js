import DeltaTracker from "./DeltaTracker";
class GameLoop {
    constructor(loopFunction) {
        this.loopFunction = loopFunction;
        this.deltaTracker = new DeltaTracker();
    }
    run() {
        window.requestAnimationFrame(this.loop.bind(this));
    }
    loop() {
        const delta = this.deltaTracker.getAndUpdateDelta();
        this.loopFunction(delta);
        window.requestAnimationFrame(this.loop.bind(this));
    }
}
export default GameLoop;
