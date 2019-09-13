const THREE = require("three");

export default class Cloud {
  constructor({ cloudColor }) {
    // Create an empty container that will hold the different parts of the cloud
    this.mesh = new THREE.Object3D();

    // create a cube geometry;
    // this shape will be duplicated to create the cloud
    let geom = new THREE.BoxGeometry(20, 20, 20);

    // create a material; a simple white material will do the trick
    let mat = new THREE.MeshPhongMaterial({
      color: cloudColor
    });

    // duplicate the geometry a random number of times
    let nBlocs = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < nBlocs; i++) {
      // create the mesh by cloning the geometry
      let m = new THREE.Mesh(geom, mat);

      // set the position and the rotation of each cube randomly
      m.position.x = i * 15;
      m.position.y = Math.random() * 10;
      m.position.z = Math.random() * 10;
      m.rotation.z = Math.random() * Math.PI * 2;
      m.rotation.y = Math.random() * Math.PI * 2;

      // set the size of the cube randomly
      let s = 0.1 + Math.random() * 0.9;
      m.scale.set(s, s, s);

      // allow each cube to cast and to receive shadows
      m.castShadow = true;
      m.receiveShadow = true;

      // add the cube to the container we first created
      this.mesh.add(m);
    }
  }
}
