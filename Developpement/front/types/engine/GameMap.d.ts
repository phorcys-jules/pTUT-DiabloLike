import { Block } from "../map/block.js";
declare class GameMap {
    /**
     * Texture de la case
     */
    static maps: Block[][];
    private itemMaps;
    private width;
    private height;
    constructor();
    deleteBlock(p_x: number, p_y: number): Promise<void>;
    ajoutBlock(p_block: Block): void;
    /**
     * Redessinne la carte
     * @param context objet html ou dessiner : Canva 2D
     */
    render(context: CanvasRenderingContext2D): Promise<void>;
    /**
     * Init a map from a JSON File
     * @param floorNumber number of the floor
     */
    initMap(floorNumber: number): void;
    getCurrentTime(): void;
}
export default GameMap;
