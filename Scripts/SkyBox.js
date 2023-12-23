import * as THREE from "three";

// manipulate materials
// load the cube map
var path = "/Assets/cubemap/";
var format = ".jpg";
var urls = [
  path + "px" + format,
  path + "nx" + format,
  path + "py" + format,
  path + "ny" + format,
  path + "pz" + format,
  path + "nz" + format,
];
var reflectionCube = new THREE.CubeTextureLoader().load(urls);
reflectionCube.format = THREE.RGBFormat;
scene.background = reflectionCube;

var maps = ["map", "bumpMap", "roughnessMap"];
maps.forEach(function (mapName) {
  var texture = planeMaterial[mapName];
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(15, 15);
});
