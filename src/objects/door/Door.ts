import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

const loader = new GLTFLoader();

const dracoLoader = new DRACOLoader();

dracoLoader.setDecoderPath("/examples/jsm/libs/draco/");
loader.setDRACOLoader(dracoLoader);

export class Door {
  constructor(
    public position?: THREE.Vector3,
    public scale?: THREE.Vector3,
    public rotation?: THREE.Euler
  ) {}

  async load() {
    const gltf = await loader.loadAsync("src/assets/gltf/door.gltf");

    for (const child of gltf.scene.children) {
      child.castShadow = true;
      child.receiveShadow = true;
    }

    if (this.position) gltf.scene.position.set(...this.position.toArray());
    if (this.scale) gltf.scene.scale.set(...this.scale.toArray());
    if (this.rotation) gltf.scene.setRotationFromEuler(this.rotation);

    return gltf.scene;
  }
}
