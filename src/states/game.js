import Ship from "../assets/ship";
import Asteroids from "../assets/asteroids";
import Effects from "../assets/effects";

import { FRAME_RATE } from "../assets/constants";

//import { Particles } from "../assets/particles";

export default function startGame(canvas, ctx) {
  //State
  let colision = false;

  // Initialize Asteroid Filed
  let asteroids = new Asteroids(canvas);
  asteroids.createAsteroidField();

  // Initialize Ship
  let ship = new Ship(canvas);
  let asteroid_field = [];

  // Initialize Effects
  let effects = new Effects(canvas);
  //let effects = new Particles(canvas);

  /**
   * main game loop
   */
  let update = () => {
    // draw space
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //draw ship
    ship.render(ctx, ship);

    //draw asteroids
    asteroids.render(ctx);

    //detect colisions
    asteroid_field = asteroids.getAsteriodField();
    colision = ship.detectColisions(ctx, ship, asteroid_field);

    if (colision) {
      ship.exploding = true;
      effects.shipExplosion(ctx, ship);
      ship = ship.createNewShip(canvas, ship);
      asteroids.createAsteroidField();
    }
  };

  // Input handlers
  let action = (event) => ship.inputHandler(event, ship);
  document.addEventListener("keydown", action);
  document.addEventListener("keyup", action);

  // game loop frame rate
  setInterval(update, 1000 / FRAME_RATE);
}
