import  Game  from "./Game.js";

async function bootstrap() {
  const canvasEl = document.getElementById("game-canvas") as HTMLCanvasElement | undefined;
  if (canvasEl == null) {
    console.log("Couldn't find the canvas element");
    return
  }

  const game = new Game(canvasEl);
  game.run();
}

bootstrap();