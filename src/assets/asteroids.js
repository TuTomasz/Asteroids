import Asteroid from "./asteroid";
import {
  ASTEROID_NUM,
  ASTEROID_SIZE,
  ASTERIOD_BOUNDING_BOX,
} from "./constants";

export default class Asteroids {
  constructor(canvas, asteroid_field = []) {
    this.canvas = canvas;
    this.ASTEROID_NUM = ASTEROID_NUM;
    this.asteroid_field = asteroid_field;
  }
  /*
   * Reset asteroid field array
   */
  resetAsteroidField() {
    this.asteroid_field = [];
  }
  /*
   * fetch current asteroid field
   */
  getAsteriodField() {
    return this.asteroid_field;
  }
  /**
   * @param  {Number} x1 - object 1 "x" coordinate
   * @param  {Number} y1 - object 1 "y" coordinate
   * @param  {Number} x2 - object 2 "x" coordinate
   * @param  {Number} y2 - object 2 "y" coordinate
   */
  getDistanceBetweenObjects(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
  /**
   * Create Asteroid field
   */
  createAsteroidField() {
    this.asteroid_field = [];
    let x, y;
    for (let i = 0; i < this.ASTEROID_NUM; i++) {
      do {
        x = Math.floor(Math.random() * this.canvas.width);
        y = Math.floor(Math.random() * this.canvas.height);
      } while (
        this.getDistanceBetweenObjects(
          this.canvas.width / 2,
          this.canvas.width / 2,
          x,
          y
        ) <
        ASTEROID_SIZE * 2 + 100
      );

      let asteroid = new Asteroid(x, y);
      this.asteroid_field.push(asteroid);
    }
  }

  /**
   * Render function for Asteroids
   * @param  {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    this.asteroid_field.forEach((a) => {
      // draw path
      ctx.strokeStyle = "white";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(
        a.x + a.radius * a.offset[0] * Math.cos(a.angle),
        a.y + a.radius * a.offset[0] * Math.sin(a.angle)
      );
      //draw polygon
      for (let j = 1; j < a.vertecies; j++) {
        ctx.lineTo(
          a.x +
            a.radius *
              a.offset[j] *
              Math.cos(a.angle + (j * Math.PI * 2) / a.vertecies),
          a.y +
            a.radius *
              a.offset[j] *
              Math.sin(a.angle + (j * Math.PI * 2) / a.vertecies)
        );
      }

      ctx.closePath();
      ctx.stroke();

      if (ASTERIOD_BOUNDING_BOX) {
        ctx.strokeStyle = "green";
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // apply motion
      a.x += a.x_velocity;
      a.y += a.y_velocity;

      // handle edge of screen
      if (a.x < 0 - a.radius) {
        a.x = this.canvas.width + a.radius;
      } else if (a.x > this.canvas.width + a.radius) {
        a.x = 0 - a.radius;
      }
      if (a.y < 0 - a.radius) {
        a.y = this.canvas.height + a.radius;
      } else if (a.y > this.canvas.height + a.radius) {
        a.y = 0 - a.radius;
      }
    });
  }
}
