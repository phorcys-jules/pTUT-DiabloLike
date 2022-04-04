declare type GameLoopFunction = (delta: number) => void;
declare class GameLoop {
    private loopFunction;
    private deltaTracker;
    continue: boolean;
    constructor(loopFunction: GameLoopFunction);
    run(): void;
    stop(): void;
    private loop;
}
export default GameLoop;
