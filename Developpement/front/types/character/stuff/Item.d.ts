export declare abstract class Item {
    private name;
    constructor(name: String);
    static loadImage(): Promise<void>;
    action(): void;
}
