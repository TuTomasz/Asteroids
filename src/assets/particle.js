import { PARTICLE_SPEED, PARTICLE_LIFESPAN } from "./constants";
export default class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xv = Math.random() * PARTICLE_SPEED * (Math.random() < 0.5 ? 1 : -1);
    this.yv = Math.random() * PARTICLE_SPEED * (Math.random() < 0.5 ? 1 : -1);
    this.lifespan = Math.floor(Math.random() * PARTICLE_LIFESPAN);
    this.size = 2;
  }
}
