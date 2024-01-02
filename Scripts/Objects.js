import * as THREE from "three";

export class Objects {
  /**
   * Creates a cylinder mesh.
   * @param {number} radius - The radius of the cylinder.
   * @param {number} height - The height of the cylinder.
   * @returns {THREE.Mesh} A cylinder mesh.
   */
  static createCylinder(radius, height) {
    const cylinderGeometry = new THREE.CylinderGeometry(
      radius,
      radius,
      height,
      32
    );
    const cylinderMaterial = new THREE.MeshBasicMaterial({ color: "#ffeaa7" });
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinder.castShadow = true;
    return cylinder;
  }

  /**
   * Creates a sphere mesh.
   * @param {number} size - The radius of the sphere.
   * @returns {THREE.Mesh} A sphere mesh.
   */
  static createSphere(size) {
    const sphereGeometry = new THREE.SphereGeometry(size);
    const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x0f00ff });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(0, 4, 2.5);
    return sphere;
  }

  /**
   * Creates a simple platform mesh.
   * @returns {THREE.Mesh} A box-shaped platform mesh.
   */
  static createPlatform() {
    const platformGeometry = new THREE.BoxGeometry(3, 0.3, 2);
    const platformMaterial = new THREE.MeshStandardMaterial({
      color: 0xf3ff00,
    });
    const platformMesh = new THREE.Mesh(platformGeometry, platformMaterial);
    return platformMesh;
  }
}
