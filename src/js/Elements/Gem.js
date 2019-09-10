export default class Gem {
  constructor(THREE, color, TweenMax, Power2) {
    this.THREE = THREE;
    this.TweenMax = TweenMax;
    this.Power2 = Power2;

    let gemGeom = new THREE.SphereGeometry(5, 3, 2);
    let gemMat = new THREE.MeshPhongMaterial({
      color: color,
      shininess: 0,
      specular: color,
      flatShading: THREE.FlatShading
    });

    this.mesh = new THREE.Mesh(gemGeom, gemMat);

    this.box = new THREE.Box3().setFromObject(this.mesh);
  }

  explode(pos, color, scale, callback) {
    let THREE = this.THREE;

    this.mesh.material.color = new THREE.Color(color);
    this.mesh.material.needsUpdate = true;
    this.mesh.scale.set(scale, scale, scale);

    let targetX = pos.x + (-1 + Math.random() * 2) * 50;
    let targetY = pos.y + (-1 + Math.random() * 2) * 50;
    let speed = 0.6 + Math.random() * 0.2;

    this.TweenMax.to(this.mesh.rotation, speed, {
      x: Math.random() * 12,
      y: Math.random() * 12
    });

    this.TweenMax.to(this.mesh.scale, speed, {
      x: 0.1,
      y: 0.1,
      z: 0.1
    });

    this.TweenMax.to(this.mesh.position, speed, {
      x: targetX,
      y: targetY,
      onComplete() {
        if (typeof callback !== "function") return;

        callback.call();
      }
    });
  }
}
