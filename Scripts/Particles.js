import * as THREE from "three";

export class Particles
{
  static CreateParticle = () => {
    const geometry = new THREE.SphereGeometry(0.15, 24, 24);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const particle = new THREE.Mesh(geometry, material);
    const [x, y, z] = Array(3)
      .fill()
      .map(() => THREE.MathUtils.randFloatSpread(100));
    particle.position.set(x, y, z);
    return particle;
  };
}
