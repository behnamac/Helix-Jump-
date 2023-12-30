import * as THREE from "three";
import { OrbitControls } from "./plugin/jsm/controls/OrbitControls";

export class Camera {
  /**
   * Creates a perspective camera for a Three.js scene.
   * @returns {THREE.PerspectiveCamera} A Three.js perspective camera.
   */
  static createCamera() {
    const aspectRatio = window.innerWidth / window.innerHeight;
    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    camera.position.set(0, 3.4, 9);
    return camera;
  }

  /**
   * Adds orbit controls to the camera.
   * @param {THREE.Camera} camera - The camera to add orbit controls to.
   * @param {THREE.WebGLRenderer} renderer - The renderer used in the scene.
   * @returns {OrbitControls} Orbit controls for the camera.
   */
  static addOrbitControls(camera, renderer) {
    return new OrbitControls(camera, renderer.domElement);
  }
}
