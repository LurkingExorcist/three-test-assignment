import * as THREE from "three";

export const mainCamera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

mainCamera.position.z = 5;
mainCamera.position.y = 3;
mainCamera.position.x = 1;

mainCamera.lookAt(new THREE.Vector3())