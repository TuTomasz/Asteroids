import {
  SHIP_SIZE,
  ACCELERATION,
  FRICTION,
  TURN_RATE,
  FRAME_RATE,
  SHIP_BOUNDING_BOX,
  SHIP_EXPLODE_TIME,
  BOUNDING_BOX_COLOR,
} from "./constants";

/**
 * Ship class contains ship parameters and state
 */
export default class Ship {
  constructor(canvas) {
    //world constants
    this.width = canvas.width;
    this.height = canvas.height;
    this.FRAME_RATE = FRAME_RATE;
    this.FRICTION = FRICTION;
    this.TURN_RATE = TURN_RATE;

    //ship variables
    this.SHIP_SIZE = SHIP_SIZE;
    this.ACCELERATION = ACCELERATION;
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.radius = SHIP_SIZE / 2;
    this.angle = (90 / 180) * Math.PI; // convert to radians
    this.rotation = 0;
    this.driveOn = false;
    this.thrust = {
      x: 0,
      y: 0,
    };
    this.explodeTime = SHIP_EXPLODE_TIME * FRAME_RATE;
    this.railgunOn = false;
    this.exploding = false;
  }
  createNewShip(canvas, oldShip) {
    if (oldShip.explodeTime < 0) {
      oldShip == null;
      return new Ship(canvas);
    }
  }

  distanceBetween(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
  detectColisions(ctx, ship, asteroids, effects) {
    for (let i = 0; i < asteroids.length; i++) {
      let a = asteroids[i];

      if (
        this.distanceBetween(ship.x, ship.y, a.x, a.y) <
        ship.radius + a.radius
      ) {
        return true;
      }
    }
  }

  render(ctx, ship) {
    if (SHIP_BOUNDING_BOX) {
      ctx.strokeStyle = BOUNDING_BOX_COLOR;
      ctx.beginPath();
      ctx.arc(ship.x, ship.y, ship.radius, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.strokeStyle = "white";
    ctx.lineWidth = this.SHIP_SIZE / 20;
    // update thrust
    if (ship.driveOn == true) {
      ship.thrust.x +=
        (ship.ACCELERATION * Math.cos(ship.angle)) / this.FRAME_RATE;
      ship.thrust.y -=
        (ship.ACCELERATION * Math.sin(ship.angle)) / this.FRAME_RATE;
      // render ship
      ctx.beginPath();
      ctx.moveTo(
        ship.x + (4 / 3) * ship.radius * Math.cos(ship.angle),
        ship.y - (4 / 3) * ship.radius * Math.sin(ship.angle)
      );
      ctx.lineTo(
        ship.x -
          ship.radius * ((2 / 3) * Math.cos(ship.angle) + Math.sin(ship.angle)),
        ship.y +
          ship.radius * ((2 / 3) * Math.sin(ship.angle) - Math.cos(ship.angle))
      );
      ctx.lineTo(
        ship.x -
          ship.radius * ((2 / 3) * Math.cos(ship.angle) - Math.sin(ship.angle)),
        ship.y +
          ship.radius * ((2 / 3) * Math.sin(ship.angle) + Math.cos(ship.angle))
      );
      ctx.closePath();
      ctx.stroke();
      // render thruster
      ctx.fillStyle = "Blue";
      ctx.strokeStyle = "white";

      ctx.beginPath();
      ctx.moveTo(
        ship.x -
          ship.radius *
            ((2 / 3) * Math.cos(ship.angle) + 0.5 * Math.sin(ship.angle)),
        ship.y +
          ship.radius *
            ((2 / 3) * Math.sin(ship.angle) - 0.5 * Math.cos(ship.angle))
      );
      ctx.lineTo(
        ship.x - ship.radius * (5 / 3) * Math.cos(ship.angle),
        ship.y + ship.radius * (5 / 3) * Math.sin(ship.angle)
      );
      ctx.lineTo(
        ship.x -
          ship.radius *
            ((2 / 3) * Math.cos(ship.angle) - 0.5 * Math.sin(ship.angle)),
        ship.y +
          ship.radius *
            ((2 / 3) * Math.sin(ship.angle) + 0.5 * Math.cos(ship.angle))
      );
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "red";
      ctx.fillRect(ship.x - 1, ship.y - 2, 2, 2);
    } else {
      ship.thrust.x -= (ship.FRICTION * ship.thrust.x) / this.FRAME_RATE;
      ship.thrust.y -= (ship.FRICTION * ship.thrust.y) / this.FRAME_RATE;
      // render ship
      ctx.beginPath();
      ctx.moveTo(
        ship.x + (4 / 3) * ship.radius * Math.cos(ship.angle),
        ship.y - (4 / 3) * ship.radius * Math.sin(ship.angle)
      );
      ctx.lineTo(
        ship.x -
          ship.radius * ((2 / 3) * Math.cos(ship.angle) + Math.sin(ship.angle)),
        ship.y +
          ship.radius * ((2 / 3) * Math.sin(ship.angle) - Math.cos(ship.angle))
      );
      ctx.lineTo(
        ship.x -
          ship.radius * ((2 / 3) * Math.cos(ship.angle) - Math.sin(ship.angle)),
        ship.y +
          ship.radius * ((2 / 3) * Math.sin(ship.angle) + Math.cos(ship.angle))
      );
      ctx.closePath();
      ctx.stroke();

      ctx.fillStyle = "red";
      ctx.fillRect(ship.x - 1, ship.y - 2, 2, 2);
    }

    // move ship

    if (this.explodeTime > 0) {
      this.explodeTime--;
      if (this.explodeTime == 0) {
        console.log("exploded");
      }
    } else {
      ship.x = ship.x + ship.thrust.x;
      ship.y = ship.y + ship.thrust.y;
    }

    // handle edge of screen
    if (ship.x < 0 - ship.radius) {
      ship.x = this.width + ship.radius;
    } else if (ship.x > this.width + ship.radius) {
      ship.x = 0 - ship.radius;
    }
    if (ship.y < 0 - ship.radius) {
      ship.y = this.height + ship.radius;
    } else if (ship.y > this.height + ship.radius) {
      ship.y = 0 - ship.radius;
    }

    ship.angle += ship.rotation;
  }
  /**
   * Handle actions based on player input
   * @param  {KeyboardEvent} event
   * @param  {object} ship
   */
  inputHandler(event, ship) {
    if (event.type == "keydown") {
      switch (event.keyCode) {
        case 38:
          ship.driveOn = true;
          break;
        case 32:
          this.railgunOn = true;
          console.log(this.railgunOn);
          break;
        case 37:
          ship.rotation = ((this.TURN_RATE / 180) * Math.PI) / this.FRAME_RATE;
          break;
        case 39:
          ship.rotation = ((-this.TURN_RATE / 180) * Math.PI) / this.FRAME_RATE;
          break;
        default:
          break;
      }
    } else if (event.type == "keyup") {
      switch (event.keyCode) {
        case 38:
          ship.driveOn = false;
          break;
        case 32:
          this.railgunOn = false;
          console.log(this.railgunOn);
          break;
        case 37:
          ship.rotation = 0;
          break;
        case 39:
          ship.rotation = 0;
          break;
        default:
          break;
      }
    }
  }
}
