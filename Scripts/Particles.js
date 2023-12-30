import * as THREE from "three";

export class Particles {
  /**
   * Creates a particle object.
   * @returns {THREE.Mesh} A particle mesh.
   */
  static createParticle() {
    const geometry = new THREE.SphereGeometry(0.15, 24, 24);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const particle = new THREE.Mesh(geometry, material);

    // Randomly position the particle within a 100 unit cube
    const randomPosition = () => THREE.MathUtils.randFloatSpread(100);
    particle.position.set(randomPosition(), randomPosition(), randomPosition());

    return particle;
  }
}
