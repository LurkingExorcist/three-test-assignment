import * as THREE from "three";

import { Cube, Door, Plane, Background } from "@/objects";

export class MainScene extends THREE.Scene {
  public ssrSelects: THREE.Mesh[] = [];

  constructor() {
    super();
  }

  private async ambient() {
    const texture = await new Background().load();

    this.background = texture;
    this.backgroundBlurriness = 0.3;
    this.environment = texture;
  }

  private async lighting() {
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 500;

    dirLight.position.set(4, 10, 2);
    dirLight.lookAt(new THREE.Vector3());

    this.add(dirLight);
  }

  private async objects() {
    await new Cube(
      new THREE.Vector3(1, 1, 0),
      new THREE.Vector3(2, 2, 2),
      new THREE.Euler(0, 45, 0)
    )
      .load()
      .then((obj) => this.add(obj));

    await new Door(
      new THREE.Vector3(-1, 1.61, 1),
      new THREE.Vector3(0.15, 0.15, 0.15),
      new THREE.Euler(0, 45, 0)
    )
      .load()
      .then((group) => {
        this.add(group);
        group.children.forEach((obj) => {
          if (obj instanceof THREE.Mesh) {
            this.ssrSelects.push(obj);
          }
        })
      });

    await new Plane().load().then((obj) => this.add(obj));
  }

  async init() {
    await this.ambient();
    await this.lighting();
    await this.objects();

    return this;
  }
}
