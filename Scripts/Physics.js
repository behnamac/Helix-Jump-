import * as CANNON from "cannon-es";

export class Physics {
  /**
   * Creates and returns a physics world with gravity.
   * @returns {CANNON.World} A world with gravity set.
   */
  static loadGravity() {
    const world = new CANNON.World();
    world.gravity.set(0, -9.8, 0); // Setting Earth-like gravity
    return world;
  }

  /**
   * Creates a sphere collider.
   * @param {number} radius - Radius of the sphere.
   * @param {CANNON.Vec3} position - Position of the sphere.
   * @param {number} mass - Mass of the sphere, default is 5.
   * @returns {CANNON.Body} A sphere body with the specified parameters.
   */
  static createSphereCollider(radius, position, mass = 5) {
    const shape = new CANNON.Sphere(radius);
    const body = new CANNON.Body({ mass, type: CANNON.Body.DYNAMIC, shape });
    body.position.copy(position);
    return body;
  }

  /**
   * Creates a box collider.
   * @param {CANNON.Vec3} size - Size of the box.
   * @param {CANNON.Vec3} position - Position of the box.
   * @param {CANNON.Quaternion} quaternion - Orientation of the box.
   * @param {number} mass - Mass of the box, default is 5.
   * @returns {CANNON.Body} A box body with the specified parameters.
   */
  static createBoxCollider(size, position, quaternion, mass = 5) {
    const shape = new CANNON.Box(size);
    const body = new CANNON.Body({ mass, type: CANNON.Body.DYNAMIC, shape });
    body.position.copy(position);
    body.quaternion.copy(quaternion);
    return body;
  }
}
