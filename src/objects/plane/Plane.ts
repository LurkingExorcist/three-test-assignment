import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils";

export class Plane {
  async load() {
    const texture = await new THREE.TextureLoader().loadAsync( "src/assets/textures/plane.png" );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 8, 8 );
    texture.magFilter = THREE.NearestFilter;

    const geometry = new THREE.PlaneGeometry(20, 20);
    const material = new THREE.MeshStandardMaterial({
      map: texture
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.rotateX(degToRad(-90));

    return mesh;
  }
}
