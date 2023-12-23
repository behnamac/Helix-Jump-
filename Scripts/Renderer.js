import * as THREE from "three";

export const CreateRenderer = () => {
  const renderer = new THREE.WebGLRenderer();
  renderer.shadowMap.enabled = true;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor("#74b9ff");
  document.body.appendChild(renderer.domElement);
  return renderer;
};
