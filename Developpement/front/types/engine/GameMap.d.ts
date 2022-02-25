import { Block } from "../map/block.js";
declare class GameMap {
    /**
     * Texture de la case
     */
    static maps: Block[][];
    static width: number;
    static height: number;
    static currentFloor: number;
    static renderable: {
        (): void;
    }[];
    constructor();
    deleteBlock(p_x: number, p_y: number): void;
    static ajoutBlock(p_block: Block): void;
    static nextFloor(): void;
    static previousFloor(): void;
    /**
     * Redessinne la carte
     * @param context objet html ou dessiner : Canva 2D
     */
    static render(context: CanvasRenderingContext2D): Promise<void>;
    /**
     * Init a map from a JSON File
     */
    static initMap(): void;
    static jsonProceduralMap(): void;
    getCurrentTime(): void;
}
export default GameMap;
