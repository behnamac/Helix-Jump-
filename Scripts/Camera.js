import * as THREE from "three";
import { OrbitControls } from "./plugin/jsm/controls/OrbitControls";

export const CreateCamera = () => {
  var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.x = 0;
  camera.position.y = 3.4;
  camera.position.z = 9;
  return camera;
};

export const OrbitRotaiotn = (camera, renderer) => {
  const control = new OrbitControls(camera, renderer.domElement);
  return control;
};

// Handle window resize
