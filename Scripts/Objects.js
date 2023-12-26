import * as THREE from "three";

export class Objects
{
  static createCylinder = (radius, height) => {
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
  
  static createSphere = (size) => {
    const sphereGeometry = new THREE.SphereGeometry(size);
    const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x0f00ff });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(0, 4, 2.5);
  
    return sphere;
  };
  
  static createPlatform = () => {  
    const platformGeometry = new THREE.BoxGeometry(3, 0.3, 2);
    const platformMaterial = new THREE.MeshStandardMaterial({ color: 0xF3FF00 });
    const platformMesh = new THREE.Mesh(platformGeometry, platformMaterial);
      
    return platformMesh;
  };
}
