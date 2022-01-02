import  Game  from "./Game.js";

async function bootstrap() {
  const canvasEl = document.getElementById("game-canvas") as HTMLCanvasElement | undefined;
  if (canvasEl == null) {
    console.log("Couldn't find the canvas element");
    return
  }

  const context = canvasEl.getContext("2d") as  CanvasRenderingContext2D;

  const game = new Game(context, canvasEl.width, canvasEl.height);
  game.run();
}

bootstrap()