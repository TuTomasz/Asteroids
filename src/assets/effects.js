import Particle from "./particle";
import { MAX_PARTICLES } from "./constants";
export default class Effects {
  constructor(canvas) {
    this.canvas = canvas;
    this.particles = [];
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

  bulletCollision(ctx, x, y) {
    let particleNumber = MAX_PARTICLES;
    for (let index = 0; index < particleNumber; index++) {
      let particle = new Particle(x, y);
      this.particles.push(particle);
    }
  }

  renderParticles(ctx, particles) {
    if (particles.length == 0) {
      return;
    } else {
      for (let particle of particles) {
        if (particle.lifespan < 0) {
          this.particles.pop();
        }
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2, false);
        ctx.fill();

        //move the bullet
        particle.x += particle.xv;
        particle.y += particle.yv;

        particle.lifespan -= 1;

        // handle edge of screen
        if (particle.x < 0) {
          particle.x = this.width;
        } else if (particle.x > this.width) {
          particle.x = 0;
        }
        if (particle.y < 0) {
          particle.y = this.height;
        } else if (particle.y > this.height) {
          particle.y = 0;
        }
      }
    }
  }
}
