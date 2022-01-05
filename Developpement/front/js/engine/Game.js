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
    constructor(canvasEl, char) {
        /**
         * key : name key down,
         * value : isDown ?
         */
        //private keyStates: {[key: string]: boolean} = {};
        this.keyStates = [];
        this.canvasEl = canvasEl;
        this.context = canvasEl.getContext("2d");
        this.width = canvasEl.width;
        this.height = canvasEl.height;
        this.char = char;
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
            if (!this.keyStates.includes(e.key)) {
                this.keyStates.push(e.key);
            }
        });
        document.addEventListener("keyup", e => {
            e.preventDefault();
            //this.keyStates[e.key] = false;
            this.keyStates.splice(this.keyStates.indexOf(e.key));
        });
    }
    isKeyDown(key) {
        return this.keyStates.includes(key);
    }
    isAnyKeyDown() {
        return this.keyStates.length != 0;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('GG u run the Game');
            //bg image
            const img = yield ImageUtils.loadImageFromUrl("./assets/img/map/dirt.jpg");
            const border = yield ImageUtils.loadImageFromUrl("./assets/img/map/border.jpg");
            const wall = yield ImageUtils.loadImageFromUrl("./assets/img/map/wall.png");
            this.map = new GameMap(img, border, wall, this.width, this.height);
            this.mobImage = yield ImageUtils.loadImageFromUrl("./assets/img/mob/zombie_bas.png");
            this.context.drawImage(this.mobImage, 3 * 64, 3 * 64);
            const gameLoop = new GameLoop(this.loop.bind(this));
            gameLoop.run();
        });
    }
    /**
     * Appeler a chaque update du jeu
     * @param delta tmps depuis dernier appel
     */
    loop(delta) {
        //tmp for presentation TODO remove
        delta *= 4;
        //redessine la carte
        this.map.render(this.context);
        //Détéction des touches et lancement des fonctions associé
        if (this.isAnyKeyDown()) {
            if (this.isKeyDown("d") || this.isKeyDown("ArrowRight")) {
                this.char.walk(3);
            }
            else if (this.isKeyDown("q") || this.isKeyDown("ArrowLeft")) {
                this.char.walk(4);
            }
            if (this.isKeyDown("s") || this.isKeyDown("ArrowDown")) {
                this.char.walk(2);
            }
            else if (this.isKeyDown("z") || this.isKeyDown("ArrowUp")) {
                this.char.walk(1);
            }
        }
        //redessine le perso
        this.char.paint(this.context);
        console.log(this.keyStates);
    }
}
export default Game;
