import menuState from "../states/menu";
import Ship from "../assets/ship";
import Asteroids from "../assets/asteroids";
import Effects from "../assets/effects";

import { FRAME_RATE, START_LEVEL } from "../assets/constants";

//import { Particles } from "../assets/particles";

export default function startGame(canvas, ctx) {
  //State
  let score = 0;
  let level = START_LEVEL;
  let lives = 3;
  let WinCondition = false;
  let shipColision = false;
  let bulletCollision = { collison: false, asteroid: null };

  // Initialize Asteroid Filed
  let asteroids = new Asteroids(canvas);
  asteroids.createAsteroidField(level);

  // Initialize Ship
  let ship = new Ship(canvas);
  let asteroid_field = [];
  let ammo = [];

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

    // display score
    ctx.font = "20px Orbitron";
    ctx.fillStyle = "white";

    ctx.textBaseline = "start";
    ctx.textAlign = "start";
    ctx.fillText(`Score: ${score}`, 20, 30);

    // display lives
    ctx.font = "20px Orbitron";
    ctx.fillStyle = "white";

    ctx.textBaseline = "start";
    ctx.textAlign = "end";
    ctx.fillText(`Lives: ${lives}`, canvas.width - 20, 30);

    //detect colisions

    asteroid_field = asteroids.getAsteriodField();
    shipColision = ship.detectColisions(ctx, ship, asteroid_field);

    //bullet/asteroid collisions
    for (let bullet of ship.bullets) {
      bulletCollision = bullet.detectColisions(ctx, bullet, asteroid_field);

      if (bulletCollision) {
        ship.bullets.pop();

        effects.bulletCollision(
          ctx,
          bulletCollision.bullet.x,
          bulletCollision.bullet.y
        );

        if (bulletCollision.asteroid.size == 100) {
          score += 100;
        } else if (bulletCollision.asteroid.size == 50) {
          score += 50;
        } else if (bulletCollision.asteroid.size == 25) {
          score += 25;
        }

        asteroid_field.splice(
          asteroid_field.indexOf(bulletCollision.asteroid),
          1
        );
        asteroids.splitAsteroid(bulletCollision.asteroid);
      }
      if (asteroid_field.length == 0) {
        WinCondition = true;
      }
    }

    // render active particles
    effects.renderParticles(ctx, effects.particles);
    effects.renderParticles(ctx, effects.shipParticles, "orange");

    //ship/asteroid collisions
    if (shipColision) {
      ship.exploding = true;
      effects.shipExplosion(ctx, ship);
      effects.shipCollosion(ctx, ship.x, ship.y);
      lives -= 1;
      if (lives != 0) {
        ship = ship.createNewShip(canvas, ship);
      }
    }

    if (WinCondition) {
      WinCondition = false;

      level += 1;
      asteroids.createAsteroidField(level);
    }
    if (lives == 0) {
      ctx.font = "60px Orbitron";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
      clearInterval(gameloop);

      setTimeout(() => {
        menuState(canvas, ctx);
      }, 2000);
    }
  };

  // Input handlers
  let action = (event) => ship.inputHandler(event, ship);
  document.addEventListener("keydown", action);
  document.addEventListener("keyup", action);

  // game loop frame rate
  let gameloop = setInterval(update, 1000 / FRAME_RATE);

  return false;
}
