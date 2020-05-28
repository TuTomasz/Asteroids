import Asteroids from "../assets/asteroids";
import gameState from "../states/game";
import { FRAME_RATE, VERSION } from "../assets/constants";
/**
 * Defines the menu state
 * @param  {canvas} canvas
 * @param {HTMLCanvasElement} ctx
 */
export default function displayMenu(canvas, ctx) {
  //define canvas background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let asteroids = new Asteroids(canvas);
  asteroids.createAsteroidField(8);

  let update = () => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    asteroids.render(ctx);

    // define text styles

    ctx.font = "80px Orbitron";
    ctx.fillStyle = "Yellow";
    ctx.textAlign = "center";
    ctx.fillText("ASTEROIDS", canvas.width / 2, canvas.height / 3);

    ctx.fillStyle = "White";
    ctx.font = "15px Orbitron";
    ctx.fillText(
      "Instructions: Use directional buttons to steer and spacebar to fire",
      canvas.width / 2,
      canvas.height / 1.1
    );
    ctx.font = "15px Orbitron";
    ctx.fillText("Press any key to start", canvas.width / 2, canvas.height / 2);

    ctx.font = "15px Orbitron";
    ctx.fillText(`v ${VERSION}`, canvas.width / 1.1, canvas.height / 11);
  };

  let start = (event) => {
    document.removeEventListener("keydown", start);
    clearInterval(menuloop);
    // initialize game state
    gameState(canvas, ctx);
  };

  let menuloop = setInterval(update, 1000 / FRAME_RATE);

  // initialize menu event listeneers
  document.addEventListener("keydown", start);
}
