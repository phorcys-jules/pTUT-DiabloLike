import { Character } from "../character/Character.js";
import  Game  from "./Game.js";

export async function bootstrap(hero:Character, char:Character[]) {
  console.log("booting the game");
  
  const canvasEl = document.getElementById("game-canvas") as HTMLCanvasElement | undefined;
  if (canvasEl == null) {
    console.log("Couldn't find the canvas element");
    return
  }

  const game = new Game(canvasEl,hero, char);
  game.run();
}