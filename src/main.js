import menuState from "./states/menu";
import gameState from "./states/game";

// Initialize canvas
const canvas = document.getElementById("asteroids");
const ctx = canvas.getContext("2d");

// Initialize game menu state
menuState(canvas, ctx);

let start = (event) => {
  document.removeEventListener("keydown", start);

  // initialize game state
  gameState(canvas, ctx);
};

// initialize menu event listeneers
document.addEventListener("keydown", start);
