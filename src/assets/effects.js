import { FRAME_RATE, SHIP_EXPLODE_TIME } from "../assets/constants";

export default class Effects {
  constructor(canvas) {
    this.canvas = canvas;
  }
  shipExplosion(ctx, ship) {
    if (ship.exploding == true) {
      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(ship.x, ship.y, ship.radius * 1.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "orange";
      ctx.beginPath();
      ctx.arc(ship.x, ship.y, ship.radius * 1.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "yellow";
      ctx.beginPath();
      ctx.arc(ship.x, ship.y, ship.radius * 0.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(ship.x, ship.y, ship.radius * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ship.explodeTime--;
    }
  }
  test() {
    console.log("testing");
  }
}
