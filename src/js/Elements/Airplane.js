const THREE = require("three");
import Pilot from "./Pilot";

export default class Airplane {
  constructor({
    cockpitColor,
    engineColor,
    tailColor,
    wheelHolderColor,
    wheelColor,
    sideWingColor,
    propellerColor,
    bladeColor,
    bodyColor,
    faceColor,
    hairColor,
    glassColor
  }) {
    this.mesh = new THREE.Object3D();

    // Create the cabin
    let geomCockpit = new THREE.BoxGeometry(70, 50, 50, 1, 1, 1);
    geomCockpit.vertices[4].y -= 10;
    geomCockpit.vertices[4].z += 20;
    geomCockpit.vertices[5].y -= 10;
    geomCockpit.vertices[5].z -= 20;
    geomCockpit.vertices[6].y += 30;
    geomCockpit.vertices[6].z += 20;
    geomCockpit.vertices[7].y += 30;
    geomCockpit.vertices[7].z -= 20;
    let matCockpit = new THREE.MeshPhongMaterial({
      color: cockpitColor,
      flatShading: THREE.FlatShading
    });
    let cockpit = new THREE.Mesh(geomCockpit, matCockpit);
    cockpit.castShadow = true;
    cockpit.receiveShadow = true;
    this.mesh.add(cockpit);

    // Create the engine
    let geomEngine = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1);
    let matEngine = new THREE.MeshPhongMaterial({
      color: engineColor,
      flatShading: THREE.FlatShading
    });
    let engine = new THREE.Mesh(geomEngine, matEngine);
    engine.position.x = 40;
    engine.castShadow = true;
    engine.receiveShadow = true;
    this.mesh.add(engine);

    // Create the tail
    let matTailPlane = new THREE.MeshPhongMaterial({
      color: tailColor,
      flatShading: THREE.FlatShading
    });
    let geomTailPlane = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1);
    geomTailPlane.vertices[0].x = -3;
    geomTailPlane.vertices[1].x = -3;
    let tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
    tailPlane.position.set(-27, 25, 0);
    tailPlane.castShadow = true;
    tailPlane.receiveShadow = true;
    this.mesh.add(tailPlane);

    // Create the wheel holder
    let geometryWheeelHolder = new THREE.BoxGeometry(8, 20, 8, 1, 1, 1);
    let matWheelHolder = new THREE.MeshPhongMaterial({
      color: wheelHolderColor,
      flatShading: THREE.FlatShading
    });
    let wheelHolder = new THREE.Mesh(geometryWheeelHolder, matWheelHolder);
    wheelHolder.position.set(-13, -10, 0);
    wheelHolder.rotation.z = ((15 * Math.PI) / 180) * -1;
    this.mesh.add(wheelHolder);

    // Create the wheel
    let geometryWheel = new THREE.CylinderGeometry(10, 10, 5, 8);
    let matWheel = new THREE.MeshPhongMaterial({
      color: wheelColor,
      flatShading: THREE.FlatShading
    });
    let wheel = new THREE.Mesh(geometryWheel, matWheel);
    wheel.rotation.x = (90 * Math.PI) / 180;
    wheel.position.set(-15, -15, 0);
    this.mesh.add(wheel);

    // Create the wing
    let geomSideWing = new THREE.BoxGeometry(40, 8, 150, 1, 1, 1);
    let matSideWing = new THREE.MeshPhongMaterial({
      color: sideWingColor,
      flatShading: THREE.FlatShading
    });
    let sideWing = new THREE.Mesh(geomSideWing, matSideWing);
    sideWing.position.x = 10;
    sideWing.castShadow = true;
    sideWing.receiveShadow = true;
    this.mesh.add(sideWing);

    // propeller
    let geomPropeller = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1);
    let matPropeller = new THREE.MeshPhongMaterial({
      color: propellerColor,
      flatShading: THREE.FlatShading
    });
    this.propeller = new THREE.Mesh(geomPropeller, matPropeller);
    this.propeller.castShadow = true;
    this.propeller.receiveShadow = true;

    // blades
    let geomBlade = new THREE.BoxGeometry(1, 100, 20, 1, 1, 1);
    let matBlade = new THREE.MeshPhongMaterial({
      color: bladeColor,
      flatShading: THREE.FlatShading
    });

    let blade = new THREE.Mesh(geomBlade, matBlade);
    blade.position.set(8, 0, 0);
    blade.castShadow = true;
    blade.receiveShadow = true;
    this.propeller.add(blade);
    this.propeller.position.set(50, 0, 0);
    this.mesh.add(this.propeller);

    this.pilot = new Pilot({
      bodyColor,
      faceColor,
      hairColor,
      glassColor
    });
    this.pilot.mesh.position.set(-10, 27, 0);
    this.mesh.add(this.pilot.mesh);
  }
}
