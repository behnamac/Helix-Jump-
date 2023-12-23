import * as CANNON from "cannon-es";

//Load Gravity
export const LoadGravity = () => {
  var world = new CANNON.World();
  world.gravity.set(0, -9.8, 0); // Set gravity (example: Earth's gravity)

  return world;
};

export const SphereCollider = (radius, position, mass = 5) => {
  const cannonSphereShape = new CANNON.Sphere(radius);
  const cannonSphereBody = new CANNON.Body({
    mass: mass,
    type: CANNON.Body.DYNAMIC,
    shape: cannonSphereShape,
  });
  cannonSphereBody.position = position;
  return cannonSphereBody;
};

export const BoxCollider = (size, position, quaternion, mass = 5) => {
  const cannonBoxShape = new CANNON.Box(size);
  const cannonBoxBody = new CANNON.Body({
    mass: mass,
    type: CANNON.Body.DYNAMIC,
    shape: cannonBoxShape,
  });
  cannonBoxBody.position = position;
  cannonBoxBody.quaternion = quaternion;
  return cannonBoxBody;
};
