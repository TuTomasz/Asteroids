/**
 * Ship class contains ship parameters and state
 */
export default class Ship {
  constructor(
    canvas,
    size = 20,
    ACCELERATION = 2,
    FRICTION = 2,
    TURN_RATE = 2,
    FRAME_RATE = 60
  ) {
    //world constants
    this.width = canvas.width;
    this.height = canvas.height;
    this.FRAME_RATE = FRAME_RATE;
    this.FRICTION = FRICTION;
    this.TURN_RATE = TURN_RATE;

    //ship variables
    this.size = size;
    this.ACCELERATION = ACCELERATION;
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.radius = size / 2;
    this.angle = (90 / 180) * Math.PI; // convert to radians
    this.rotation = 0;
    this.driveOn = false;
    this.thrust = {
      x: 0,
      y: 0,
    };
  }

  render(ctx, ship) {
    ctx.strokeStyle = "white";
    ctx.lineWidth = this.size / 20;

    // update thrust
    if (ship.driveOn == true) {
      ship.thrust.x +=
        (ship.ACCELERATION * Math.cos(ship.angle)) / this.FRAME_RATE;
      ship.thrust.y -=
        (ship.ACCELERATION * Math.sin(ship.angle)) / this.FRAME_RATE;
    } else {
      ship.thrust.x -= (ship.FRICTION * ship.thrust.x) / this.FRAME_RATE;
      ship.thrust.y -= (ship.FRICTION * ship.thrust.y) / this.FRAME_RATE;
    }

    // move ship
    ship.x = ship.x + ship.thrust.x;
    ship.y = ship.y + ship.thrust.y;

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
