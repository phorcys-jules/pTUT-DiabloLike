import { Item } from "./Item";
export declare class Stuff {
    itemList: Item[];
    static div: HTMLDivElement;
    visible: boolean;
    constructor(itemList: Array<Item>);
    displayStuff(): void;
    hide(): void;
}
