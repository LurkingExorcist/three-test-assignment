import * as THREE from "three";

import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

const loader = new RGBELoader();

export class Background {
  async load() {
    const texture = await loader.loadAsync(
      "src/assets/hdr/HDR_029_Sky_Cloudy_Ref.hdr"
    );

    texture.mapping = THREE.EquirectangularReflectionMapping;

    return texture;
  }
}
