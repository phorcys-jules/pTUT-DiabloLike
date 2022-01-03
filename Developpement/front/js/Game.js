var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ImageUtils from "./ImageUtils.js";
import GameMap from "./GameMap.js";
import GameLoop from "./GameLoop.js";
class Game {
    constructor(canvasEl) {
        this.charX = 64;
        this.charY = 64;
        /**
         * key : name key down,
         * value : isDown ?
         */
        this.keyStates = {};
        this.canvasEl = canvasEl;
        this.context = canvasEl.getContext("2d");
        this.width = canvasEl.width;
        this.height = canvasEl.height;
        this.setup();
    }
    init() {
        return this.setup(this.canvasEl);
    }
    /**
     * setup some action as key Mapping
     */
    setup() {
        document.addEventListener("keydown", e => {
            e.preventDefault();
            this.keyStates[e.key] = true;
        });
        document.addEventListener("keyup", e => {
            e.preventDefault();
            this.keyStates[e.key] = false;
        });
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('GG u run the Game');
            //bg image
            const img = yield ImageUtils.loadImageFromUrl("./assets/img/map/dirt.jpg");
            const border = yield ImageUtils.loadImageFromUrl("./assets/img/map/border.jpg");
            const wall = yield ImageUtils.loadImageFromUrl("./assets/img/map/wall.png");
            this.map = new GameMap(img, border, wall, this.width, this.height);
            this.charImage = yield ImageUtils.loadImageFromUrl("./assets/img/perso/perso_bas.png");
            const gameLoop = new GameLoop(this.loop.bind(this));
            gameLoop.run();
        });
    }
    /**
     * Appeler a chaque update du jeu
     * @param delta tmps depuis dernier appel
     */
    loop(delta) {
        //redessine la carte
        this.map.render(this.context);
        //déplace le perso en f° du temps écouler
        if (this.keyStates["d"] || this.keyStates["ArrowRight"]) {
            this.charX += 30 * delta;
        }
        else if (this.keyStates["q"] || this.keyStates["ArrowLeft"]) {
            this.charX -= 30 * delta;
        }
        if (this.keyStates["s"] || this.keyStates["ArrowDown"]) {
            this.charY += 30 * delta;
        }
        else if (this.keyStates["z"] || this.keyStates["ArrowUp"]) {
            this.charY -= 30 * delta;
        }
        //redessine le perso
        this.context.drawImage(this.charImage, this.charX, this.charY);
    }
}
export default Game;
