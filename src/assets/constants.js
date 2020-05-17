module.exports = {
  /**
   * Asteroid options
   */

  ASTEROID_NUM: 3, //starting asteroid number
  ASTEROID_SPEED: 50, // asteroid speed
  ASTEROID_SIZE: 100, // size in pixels
  ASTEROID_EDGES: 12, // arbitrary number of edges
  ASTEROID_DISTORTION: 0.6, // distortion or jaggedness of asteroid

  /**
   * Ship options
   */

  SHIP_SIZE: 20, // ship size in pixals
  ACCELERATION: 3, // rate of acceleration in pixels per frame
  FRICTION: 2, //rate of decelleration in pixels per frame
  TURN_RATE: 360, // turn rate in radians per frame
  SHIP_EXPLODE_TIME: 1, // in seconds

  /**
   * Runtime options
   */

  FRAME_RATE: 60, // Game Frame rate

  /**
   * Development options
   */

  SHIP_BOUNDING_BOX: true, // Show ship collision box
  ASTERIOD_BOUNDING_BOX: true, // Show Asteroid collision box
  BOUNDING_BOX_COLOR: "yellow", // Set collision box color
};
