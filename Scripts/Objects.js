import * as THREE from "three";
const createRotatingObject = () => new THREE.Object3D();

const createCylinder = (radius, height) => {
  const cylinderGeometry = new THREE.CylinderGeometry(
    radius,
    radius,
    height,
    32
  );

  const cylinderMaterial = new THREE.MeshPhongMaterial({ color: "#ffeaa7" });
  const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
  cylinder.castShadow = true;
  return cylinder;
};

const createSphere = (size) => {
  const sphereGeometry = new THREE.SphereGeometry(size);
  const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x0f00ff });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(0, 4, 2.5);

  return sphere;
};

const createPlatform = () => {
  //const platformObject = new THREE.Object3D();

  const platformGeometry = new THREE.BoxGeometry(3, 0.3, 2);
  const platformMaterial = new THREE.MeshStandardMaterial({ color: 0xF3FF00 });
  const platformMesh = new THREE.Mesh(platformGeometry, platformMaterial);
  //platformObject.add(platformMesh);

  return platformMesh;
};

// const loadCustomModel = () => {
//   var objModel = new OBJLoader();
//   objModel.load("./Asset/model/obj/monkey.obj");
//   return objModel;
// };

// const loadCustomModel2 = () => {
//   var objModel = new GLTFLoader();
//   objModel.load("./Asset/model/scene.gltf");
//   return objModel;
// };

export {
  createRotatingObject,
  createCylinder,
  createSphere,
  createPlatform,
};
