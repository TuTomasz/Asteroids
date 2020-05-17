import {
  ASTEROID_SPEED,
  ASTEROID_EDGES,
  ASTEROID_SIZE,
  ASTEROID_DISTORTION,
  FRAME_RATE,
} from "./constants";

export default class Asteroid {
  constructor(x, y) {
    //Astroid Constants
    this.ASTEROID_SPEED = ASTEROID_SPEED;
    this.ASTEROID_EDGES = ASTEROID_EDGES;
    this.radius = ASTEROID_SIZE / 2;
    this.angle = Math.random() * Math.PI * 2;
    this.y = y;
    this.x = x;
    this.x_velocity =
      ((Math.random() * ASTEROID_SPEED) / FRAME_RATE) *
      (Math.random() < 0.5 ? 1 : -1);
    this.y_velocity =
      ((Math.random() * ASTEROID_SPEED) / FRAME_RATE) *
      (Math.random() < 0.5 ? 1 : -1);
    this.vertecies = Math.floor(
      Math.random() * (this.ASTEROID_EDGES + 1) + this.ASTEROID_EDGES / 2
    );
    this.offset = [];

    for (let index = 0; index < this.vertecies; index++) {
      this.offset.push(
        Math.random() * ASTEROID_DISTORTION * 2 + 1 * ASTEROID_DISTORTION
      );
    }
  }
}
