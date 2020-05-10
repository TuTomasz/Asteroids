import Ship from "../assets/ship";

// const Ship = require("./assets/ship");

export default function startGame(canvas, ctx) {
  // Presets
  const FRAME_RATE = 60;
  const SHIP_SIZE = 20; //pixels
  const TURN_RATE = 360; // radians per frame
  const ACCELERATION = 3; // px/frame
  const FRICTION = 1;

  // Initialize Assets
  let ship = new Ship(
    canvas,
    SHIP_SIZE,
    ACCELERATION,
    FRICTION,
    TURN_RATE,
    FRAME_RATE
  );

  /**
   * main game loop
   */
  let update = () => {
    // draw space
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //draw ship
    ship.render(ctx, ship);
  };

  // Input handlers
  let action = (event) => ship.inputHandler(event, ship);
  document.addEventListener("keydown", action);
  document.addEventListener("keyup", action);

  // game loop frame rate
  setInterval(update, 1000 / FRAME_RATE);
}
