import * as THREE from "three";

export class Cube {
  constructor(
    public position?: THREE.Vector3,
    public scale?: THREE.Vector3,
    public rotation?: THREE.Euler
  ) {}

  async load() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({color: 0xa10000});

    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    if (this.position) mesh.position.set(...this.position.toArray());
    if (this.scale) mesh.scale.set(...this.scale.toArray());
    if (this.rotation) mesh.setRotationFromEuler(this.rotation);

    return mesh;
  }
}
