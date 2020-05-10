/**
 * Defines the menu state
 * @param  {canvas} canvas
 * @param {HTMLCanvasElement} ctx
 */
export default function displayMenu(canvas, ctx) {
  //define canvas background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // define text styles
  ctx.font = "40px AndroidNationFont";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("ASTEROIDS", canvas.width / 2, canvas.height / 3);

  ctx.font = "20px AndroidNationFont";
  ctx.fillText("press any key to start", canvas.width / 2, canvas.height / 2);
}
