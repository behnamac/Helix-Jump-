import * as THREE from "three";

export class Lights
{
  static CreateDirlLight = () => {
    var directionalLight = new THREE.DirectionalLight(0xffffff, 2.7);
    directionalLight.position.set(180, 180, 180).normalize();
    directionalLight.rotation.x = Math.PI / 4;
    return directionalLight;
  };
}
