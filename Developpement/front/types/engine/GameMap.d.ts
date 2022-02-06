declare class GameMap {
    /**
     * Texture de la case
     */
    private maps;
    constructor();
    getMaps(): Block[][];
    setMaps(p_maps: Block[][]): void;
    getBlock(p_x: number, p_y: number): Block;
    setBlock(p_x: number, p_y: number, p_block: Block): void;
    deleteBlock(p_x: number, p_y: number): Promise<void>;
    ajoutBlock(p_block: Block): void;
    /**
     * Redessinne la carte
     * @param context objet html ou dessiner : Canva 2D
     */
    render(context: CanvasRenderingContext2D): void;
    /**
     * Init a map from a JSON File
     * @param floorNumber number of the floor
     */
    initMap(floorNumber: number): void;
}
export default GameMap;
