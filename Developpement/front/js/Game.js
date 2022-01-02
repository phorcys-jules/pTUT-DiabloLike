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
    constructor(context, width, height) {
        this.charX = 0;
        this.charY = 0;
        this.context = context;
        this.width = width;
        this.height = height;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            //bg image
            const img = yield ImageUtils.loadImageFromUrl("./assets/img/map/dirt.jpg");
            this.map = new GameMap(img, this.width, this.height);
            this.charImage = yield ImageUtils.loadImageFromUrl("./assets/img/perso/perso_bas.png");
            const gameLoop = new GameLoop(this.loop.bind(this));
            gameLoop.run();
        });
    }
    loop(delta) {
        console.log(this.map);
        this.map.render(this.context);
        this.charX += 30 * delta;
        this.charY += 30 * delta;
        this.context.drawImage(this.charImage, this.charX, this.charY);
    }
}
export default Game;
