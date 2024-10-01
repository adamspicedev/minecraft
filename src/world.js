import * as THREE from "three";

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });

export class World extends THREE.Group {
  constructor(size = { width: 64, height: 32 }) {
    super();
    this.size = size;
  }

  generate() {
    this.clear();
    const maxBlockCount = this.size.width * this.size.width * this.size.height;
    const mesh = new THREE.InstancedMesh(geometry, material, maxBlockCount);
    mesh.count = 0;

    const blockMatrix = new THREE.Matrix4();

    for (let x = 0; x < this.size.width; x++) {
      for (let y = 0; y < this.size.height; y++) {
        for (let z = 0; z < this.size.width; z++) {
          blockMatrix.setPosition(x + 0.5, y + 0.5, z + 0.5);
          mesh.setMatrixAt(mesh.count++, blockMatrix);
        }
      }
    }

    this.add(mesh);
  }
}
