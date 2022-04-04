declare type GameLoopFunction = (delta: number) => void;
declare class GameLoop {
    private loopFunction;
    private deltaTracker;
    constructor(loopFunction: GameLoopFunction);
    run(): void;
    private loop;
}
export default GameLoop;
