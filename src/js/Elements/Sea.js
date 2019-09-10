const THREE = require("three");

export default class Sea {
  constructor({ seaColor }) {
    let geom = new THREE.CylinderGeometry(600, 600, 800, 40, 10);
    geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

    // important: by merging vertices we ensure the continuity of the waves
    geom.mergeVertices();

    // get the vertices
    let l = geom.vertices.length;

    // create an array to store new data associated to each vertex
    this.waves = [];

    for (let i = 0; i < l; i++) {
      // get each vertex
      let v = geom.vertices[i];

      // store some data associated to it
      this.waves.push({
        y: v.y,
        x: v.x,
        z: v.z,
        ang: Math.random() * Math.PI * 2, // a random angle
        amp: 5 + Math.random() * 15, // a random distance
        speed: 0.016 + Math.random() * 0.032 // a random speed between 0.016 and 0.048 radians / frame
      });
    }
    let mat = new THREE.MeshPhongMaterial({
      color: seaColor,
      transparent: true,
      opacity: 0.8,
      flatShading: THREE.FlatShading
    });

    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.receiveShadow = true;
  }

  moveWaves() {
    // get the vertices
    let verts = this.mesh.geometry.vertices;
    let l = verts.length;

    for (let i = 0; i < l; i++) {
      let v = verts[i];

      // get the data associated to it
      let vprops = this.waves[i];

      // update the position of the vertex
      v.x = vprops.x + Math.cos(vprops.ang) * vprops.amp;
      v.y = vprops.y + Math.sin(vprops.ang) * vprops.amp;

      // increment the angle for the next frame
      vprops.ang += vprops.speed;
    }

    // Tell the renderer that the geometry of the sea has changed.
    // In fact, in order to maintain the best level of performance,
    // three.js caches the geometries and ignores any changes
    // unless we add this line
    this.mesh.geometry.verticesNeedUpdate = true;

    this.mesh.rotation.z += 0.005;
  }
}
