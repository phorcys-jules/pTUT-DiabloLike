export declare class Item {
    private name;
    constructor(name: String);
    displayItem(context: CanvasRenderingContext2D): Promise<void>;
    action(): void;
}
