import * as THREE from "three";

export class Lights {
  /**
   * Creates a directional light for a Three.js scene.
   * @returns {THREE.DirectionalLight} A Three.js directional light.
   */
  static createDirLight() {
    const intensity = 2.7;
    const directionalLight = new THREE.DirectionalLight(0xffffff, intensity);
    directionalLight.position.set(180, 180, 180).normalize();
    directionalLight.rotation.x = Math.PI / 4;
    return directionalLight;
  }
}
