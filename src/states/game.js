import Ship from "../assets/ship";
import Asteroids from "../assets/asteroids";
import Effects from "../assets/effects";

import { FRAME_RATE } from "../assets/constants";

//import { Particles } from "../assets/particles";

export default function startGame(canvas, ctx) {
  //State
  let WinCondition = false;
  let shipColision = false;
  let bulletCollision = { collison: false, asteroid: null };

  // Initialize Asteroid Filed
  let asteroids = new Asteroids(canvas);
  asteroids.createAsteroidField();

  // Initialize Ship
  let ship = new Ship(canvas);
  let asteroid_field = [];
  let shots_fired = [];

  // Initialize Effects
  let effects = new Effects(canvas);
  //let effects = new Particles(canvas);

  /**
   * main game loop
   */
  let update = () => {
    // render space
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //render ship
    ship.render(ctx, ship);

    //render asteroids
    asteroids.render(ctx);

    //detect colisions
    asteroid_field = asteroids.getAsteriodField();
    shots_fired = ship.getShotsFired();

    //ship/asteroid collisions
    shipColision = ship.detectColisions(ctx, ship, asteroid_field);
    if (shipColision) {
      ship.exploding = true;
      effects.shipExplosion(ctx, ship);
      ship = ship.createNewShip(canvas, ship);
      asteroids.createAsteroidField();
    }
    //bullet/asteroid collisions
    for (let bullet of shots_fired) {
      bulletCollision = bullet.detectColisions(ctx, bullet, asteroid_field);
      console.log(bulletCollision);
      if (bulletCollision) {
        shots_fired.pop();
        ship.setShotsFired(shots_fired);
        asteroid_field.splice(asteroid_field.indexOf(bulletCollision.asteroid));
      }
      if (asteroid_field.length == 0) {
        WinCondition = true;
      }
    }

    // level win condition
    if (WinCondition) {
      WinCondition = false;
      console.log("you won");
      asteroids.createAsteroidField(5);
    }
  };

  // Input handlers
  let action = (event) => ship.inputHandler(event, ship);
  document.addEventListener("keydown", action);
  document.addEventListener("keyup", action);

  // game loop frame rate
  setInterval(update, 1000 / FRAME_RATE);
}
