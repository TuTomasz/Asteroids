import {
  BULLET_MAX,
  BULLET_SPEED,
  BULLET_SIZE,
  BULLET_DURATION,
} from "./constants";

export default class Bullet {
  constructor(canvas, x, y, a) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.x = x;
    this.y = y;
    this.xv = BULLET_SPEED * Math.cos(a);
    this.yv = -(BULLET_SPEED * Math.sin(a));
    this.speed = BULLET_SPEED;
    this.lifespan = BULLET_DURATION;
  }

  distanceBetween(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
  detectColisions(ctx, bullet, asteroids) {
    for (let i = 0; i < asteroids.length; i++) {
      let asteroid = asteroids[i];

      if (
        this.distanceBetween(bullet.x, bullet.y, asteroid.x, asteroid.y) <
        asteroid.radius
      ) {
        return { bullet: bullet, asteroid: asteroid };
      }
    }
  }

  /**
   * Render function for Bullets
   * @param  {CanvasRenderingContext2D} ctxs
   */
  render(ctx, bullet) {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, BULLET_SIZE, 0, Math.PI * 2, false);
    ctx.fill();

    //move the bullet
    bullet.x += bullet.xv;
    bullet.y += bullet.yv;

    this.lifespan -= 1;

    // handle edge of screen
    if (bullet.x < 0) {
      bullet.x = this.width;
    } else if (bullet.x > this.width) {
      bullet.x = 0;
    }
    if (bullet.y < 0) {
      bullet.y = this.height;
    } else if (bullet.y > this.height) {
      bullet.y = 0;
    }
  }
}
