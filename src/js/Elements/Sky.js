const THREE = require("three");

import Cloud from "./Cloud";

export default class Sky {
  constructor({ cloudColor }) {
    // Create an empty container
    this.mesh = new THREE.Object3D();

    // choose a number of clouds to be scattered in the sky
    this.nClouds = 20;

    // To distribute the clouds consistently,
    // we need to place them according to a uniform angle
    let stepAngle = (Math.PI * 2) / this.nClouds;

    // create the clouds
    for (let i = 0; i < this.nClouds; i++) {
      let c = new Cloud({ cloudColor });

      // set the rotation and the position of each cloud;
      // for that we use a bit of trigonometry
      let a = stepAngle * i; // this is the final angle of the cloud
      let h = 750 + Math.random() * 200; // this is the distance between the center of the axis and the cloud itself

      // Trigonometry!!! I hope you remember what you've learned in Math :)
      // in case you don't:
      // we are simply converting polar coordinates (angle, distance) into Cartesian coordinates (x, y)
      c.mesh.position.y = Math.sin(a) * h;
      c.mesh.position.x = Math.cos(a) * h;

      // rotate the cloud according to its position
      c.mesh.rotation.z = a + Math.PI / 2;

      // for a better result, we position the clouds
      // at random depths inside of the scene
      c.mesh.position.z = -400 - Math.random() * 400;

      // we also set a random scale for each cloud
      let s = 1 + Math.random() * 2;
      c.mesh.scale.set(s, s, s);

      // do not forget to add the mesh of each cloud in the scene
      this.mesh.add(c.mesh);
    }
  }
}
