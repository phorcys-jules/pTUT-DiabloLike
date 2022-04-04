import { Item } from "../item/Item";
export declare class Inventory {
    itemList: Item[];
    static div: HTMLDivElement;
    static visible: boolean;
    constructor(itemList: Array<Item>);
    static display(): void;
    static hide(): void;
}
export default Inventory;
