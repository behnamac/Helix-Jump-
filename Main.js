import * as THREE from "three";

import { Camera } from "./Scripts/Camera.js";
import { Renderer } from "./Scripts/Renderer.js";
import { Lights } from "./Scripts/Lights.js";
import { Particles } from "./Scripts/Particles.js";

import { Input } from "./Scripts/Input.js";
import { Objects } from "./Scripts/Objects.js";
import { PlatformGenarator } from "./Scripts/PlatformGenarator.js";
import { Physic } from "./Scripts/Physic.js";
import { GameManager } from "./Scripts/GameManager.js";
import { AddScore } from "./Scripts/UIManager.js";
//import { TrailRenderer } from "./Scripts/TrailRenderer.js";

// Load a scene
const scene = new THREE.Scene();

// Load a camera
var camera = Camera.CreateCamera();

// Create a renderer
var renderer = Renderer.CreateRenderer();

//Create Orbit camera Controller
//var orbit = OrbitRotaiotn(camera, renderer);

// Load a light
var directionalLight = Lights.CreateDirlLight();
scene.add(directionalLight);
//#region  objects

var world = Physic.LoadGravity();

//Create Cylinder
var cylinderRadius = 1;
var cylinderHeight = 100;
var cylinder = Objects.createCylinder(cylinderRadius, cylinderHeight);
scene.add(cylinder);

//Create Platforms
var platforms = PlatformGenarator.GenaratePlatform(scene);
var plaRigidBodys = PlatformGenarator.GenaratePlatformBody(platforms, world);

// Create a Ball
var sphere = Objects.createSphere(0.2);
var sphereRigidbody = Physic.SphereCollider(0.2, sphere.position, 5);
sphereRigidbody.name = "Ball";
world.addBody(sphereRigidbody);
scene.add(sphere);

//Create Ball Trail
//var trail = new TrailRenderer(scene);

var collidePosition = 0;
// On Collision Enter
sphereRigidbody.addEventListener("collide", function (event) {
  var contact = event.contact;
  var bodyA = contact.bi;
  var bodyB = contact.bj;

  if (bodyB.name == "GoodPlatform") {
    if (GameManager.gameState == GameManager.GameState.GamePlay) 
    {
      if(collidePosition > bodyA.position.y + 1)
      {
        AddScore();
      }
      collidePosition = bodyA.position.y;
      sphereRigidbody.velocity.set(0, 6, 0);
    }
  } 
  else if (bodyB.name == "BadPlatform") 
    GameManager.LevelFail();
  else if (bodyB.name == "FinishPlatform") 
    GameManager.LevelCompelet();
});
sphereRigidbody.addEventListener("trigger", function (event) {
  var contact = event.contact;
  var bodyA = contact.bi;
  var bodyB = contact.bj;

  if (bodyB.name == "Floor") {
    console.log(bodyB.name);
  } 
});

//#endregion

// Create a particle

for (let index = 0; index < 200; index++) {
  const particle = Particles.CreateParticle();
  scene.add(particle);
}
// Set Events
Input.SetInput();

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

  if (GameManager.gameState == GameManager.GameState.GamePlay) {
    //Set Position Ball
    deltaAngle += Input.MouseDeltaX;
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

  //trail.updateTrail(sphereRigidbody);

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
