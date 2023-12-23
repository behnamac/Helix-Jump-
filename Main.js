import * as THREE from "three";

import { CreateCamera, OrbitRotaiotn } from "./Scripts/Camera.js";
import { CreateRenderer } from "./Scripts/Renderer.js";
import { CreateDirlLight } from "./Scripts/Lights.js";
import { CreateParticle } from "./Scripts/Particles.js";
import { GridHelper } from "./Scripts/grid.js";

import { SetInput, isMouseLeftPressed, MouseDeltaX } from "./Scripts/Input.js";
import {
  createRotatingObject,
  createCylinder,
  createSphere,
} from "./Scripts/Objects.js";
import {
  GenaratePlatform,
  GenaratePlatformBody,
} from "./Scripts/PlatformGenarator.js";
import { LoadGravity, SphereCollider } from "./Scripts/Physic.js";
import { GLTFLoader } from "./node_modules/three/examples/jsm/loaders/GLTFLoader.js";
import {
  GameState,
  LevelCompelet,
  LevelFail,
  gameState,
} from "./Scripts/GameManager.js";

// Load a scene
const scene = new THREE.Scene();

// Load a camera
var camera = CreateCamera();

// Create a renderer
var renderer = CreateRenderer();

//Create Orbit camera Controller
//var orbit = OrbitRotaiotn(camera, renderer);

//Add Grid Plane
var grid = GridHelper;
scene.add(grid);

// Load GUI
const gui = new dat.GUI();

// Load a light
var directionalLight = CreateDirlLight();
scene.add(directionalLight);
//#region  objects

var world = LoadGravity();

// Creat Rotating Object
var rotatingObject = createRotatingObject();
scene.add(rotatingObject);

//Create Cylinder
var cylinderRadius = 1;
var cylinderHeight = 100;
var cylinder = createCylinder(cylinderRadius, cylinderHeight);
scene.add(cylinder);

//Create Platforms
var platforms = GenaratePlatform(scene);
var plaRigidBodys = GenaratePlatformBody(platforms, world);

// Create a Ball
var sphere = createSphere(0.2);
var sphereRigidbody = SphereCollider(0.2, sphere.position, 5);
sphereRigidbody.velocity;
sphereRigidbody.name = "Ball";
world.addBody(sphereRigidbody);
scene.add(sphere);

// On Collision Enter
sphereRigidbody.addEventListener("collide", function (event) {
  var contact = event.contact;
  var bodyA = contact.bi;
  var bodyB = contact.bj;

  if (bodyB.name == "GoodPlatform") {
    if (gameState == GameState.GamePlay) sphereRigidbody.velocity.set(0, 6, 0);
  } else if (bodyB.name == "BadPlatform") LevelFail();
  else if (bodyB.name == "FinishPlatform") LevelCompelet();
});

//#endregion

// Create a particle

for (let index = 0; index < 200; index++) {
  const particle = CreateParticle();
  scene.add(particle);
}
// Set Events
SetInput();

// Handle window resize
window.addEventListener("resize", () => {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;
  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(newWidth, newHeight);
});

//#region  Update Functions
// Loop Game
//orbit.update();

var deltaAngle = 0;
function animate() {
  requestAnimationFrame(animate);

  if (gameState == GameState.GamePlay) {
    //Set Position Ball
    deltaAngle += MouseDeltaX;
    const angle = deltaAngle * 0.01;
    sphereRigidbody.position.x = 2.5 * Math.cos(angle);
    sphereRigidbody.position.z = 2.5 * Math.sin(angle);

    //Set Position Camera
    camera.position.x = 8 * Math.cos(angle);
    if (sphereRigidbody.position.y + 2 < camera.position.y)
      camera.position.y = sphereRigidbody.position.y + 2;
    camera.position.z = 8 * Math.sin(angle);

    //Set Rotation Camera
    var targetCameraLook = new THREE.Vector3(
      sphereRigidbody.position.x,
      camera.position.y - 2,
      sphereRigidbody.position.z
    );
    camera.lookAt(targetCameraLook);
  }

  world.step(1 / 60);

  sphere.position.copy(sphereRigidbody.position);
  sphere.quaternion.copy(sphereRigidbody.quaternion);
  sphereRigidbody.velocity.x = 0;
  sphereRigidbody.velocity.z = 0;

  // cubeGeometry.position.copy(createGreenBoxRigid.position);
  // cubeGeometry.quaternion.copy(createGreenBoxRigid.quaternion);

  for (let i = 0; i < platforms.length; i++) {
    platforms[i].position.copy(plaRigidBodys[i].position);
    platforms[i].quaternion.copy(plaRigidBodys[i].quaternion);
  }

  renderer.render(scene, camera);
}

// Start the animation
animate();
//Update(renderer, scene, camera);

//#endregion

//#region  GUI Helper
function SetGUI(component, parameter, min, max) {
  gui.add(component, parameter, min, max);
}
//#endregion
