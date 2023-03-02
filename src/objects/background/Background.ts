import * as THREE from "three";

import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

const loader = new RGBELoader();

export class Background {
  async load() {
    const texture = await loader.loadAsync(
      "hdr/background.hdr"
    );

    texture.mapping = THREE.EquirectangularReflectionMapping;

    return texture;
  }
}
