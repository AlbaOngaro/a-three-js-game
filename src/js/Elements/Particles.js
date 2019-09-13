const THREE = require("three");
import { rand } from "../Utils";

export default class Particles {
  constructor({ particleColor }) {
    const MAX = 100;

    const particles = new THREE.Group();
    const geo = new THREE.SphereBufferGeometry(0.1);
    const mat = new THREE.MeshLambertMaterial({ color: particleColor });

    for (let i = 0; i < MAX; i++) {
      const particle = new THREE.Mesh(geo, mat);
      particle.velocity = new THREE.Vector3(
        rand(-0.01, 0.01),
        0.06,
        rand(-0.01, 0.01)
      );
      particle.acceleration = new THREE.Vector3(0, -0.001, 0);
      particle.position.x = rand(-1, 1);
      particle.position.z = rand(-1, 1);
      particle.position.y = rand(-1, -3);
      particles.add(particle);
    }

    return particles;
  }
}
