const canvas = document.getElementById("asteroids");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

// Presets
const frameRate = 30;

/**
 * check player keybord input
 */
checkinput = () => {
  document.addEventListener("keydown", (event) => {
    if (event.keyCode == 38) {
      console.log("up");
    } else if (event.keyCode == 40) {
      console.log("down");
    } else if (event.keyCode == 37) {
      console.log("left");
    } else if (event.keyCode == 39) {
      console.log("right");
    } else if (event.keyCode == 32) {
      console.log("fire");
    } else {
      console.log("other input");
    }
  });
};

/**
 * main game loop
 */
update = () => {
  // draw space
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  //draw ship
  ctx.strokeStyle = "white";
  ctx.strokeRect(75, 140, 150, 110);

  checkinput();
};

// game loop frame rate
setInterval(update(), 1000 / frameRate);
