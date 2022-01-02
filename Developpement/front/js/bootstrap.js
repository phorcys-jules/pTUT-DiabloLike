var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Game from "./Game.js";
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const canvasEl = document.getElementById("game-canvas");
        if (canvasEl == null) {
            console.log("Couldn't find the canvas element");
            return;
        }
        const context = canvasEl.getContext("2d");
        const game = new Game(context, canvasEl.width, canvasEl.height);
        game.run();
    });
}
bootstrap();
