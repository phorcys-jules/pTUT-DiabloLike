import { Item } from "./Item";
export declare class Inventory {
    itemList: Item[];
    static div: HTMLDivElement;
    static visible: boolean;
    constructor(itemList: Array<Item>);
    static display(): void;
    static hide(): void;
}
