import { Character } from "../character/Character.js";
import { Entity } from "../character/Entity.js";
import { User } from "../User.js";
import  Game  from "./Game.js";


export async function bootstrap(player:User, mob:Entity[]) {
  console.log("booting the game");
  
  const canvasEl = document.getElementById("game-canvas") as HTMLCanvasElement | undefined;
  if (canvasEl == null) {
    console.log("Couldn't find the canvas element");
    return
  }

  const game = new Game(canvasEl,player, mob);
  game.run();
}
