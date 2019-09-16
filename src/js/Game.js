const THREE = require("three");
const Time = require("three-time");
import { TweenMax } from "gsap/TweenMax";

import colors from "./Constants/colors";
import keys from "./Constants/keys";
import { rand } from "./Utils";

import Sea from "./Elements/Sea";
import Sky from "./Elements/Sky";
import Airplane from "./Elements/Airplane";
import Gem from "./Elements/Gem";

export default class Game {
  constructor() {
    /**
     *   MAIN VARIABLES DEFINITION
     **/
    this.score = 0;
    this.scene;
    this.camera;
    this.fieldOfView;
    this.aspectRatio;
    this.nearPlane;
    this.farPlane;
    this.HEIGHT;
    this.WIDTH;
    this.renderer;
    this.container;
    this.hemisphereLight;
    this.shadowLight;
    this.sea;
    this.sky;
    this.airplane;
    this.time = new Time();
    this.MAXGEMS = 10;
    this.MINGEMS = 3;

    this.keys = keys;

    this.y_speed = 0.8;
    this.x_speed = 0.5;

    this.toStartPos;

    // main methods
    this.createScene();
    this.createLights();
    this.createAirplane();
    this.createSea();
    this.createSky();
    this.createGems();

    //handle airplane movements
    document.addEventListener("keydown", this.handleKeyDown.bind(this), false);
    document.addEventListener("keyup", this.handleKeyUp.bind(this), false);

    //main game loop
    this.loop();
  }

  updateScore() {
    document.getElementById("score").innerText = `Score: ${this.score}`;
  }

  handleKeyDown(evt) {
    let key = evt.keyCode || evt.which;

    switch (key) {
      case 38: // up arrow
      case 87: // W key
        this.keys.up = true;
        break;
      case 40: // down arrow
      case 83: // S key
        this.keys.down = true;
        break;
      case 37: //left arrow
      case 65: // A key
        this.keys.left = true;
        break;
      case 39: // Right arrow
      case 68: // D key
        this.keys.right = true;
        break;
    }
  }

  handleKeyUp(evt) {
    let key = evt.keyCode || evt.which;

    switch (key) {
      case 38:
      case 87:
        this.keys.up = false;
        break;
      case 40:
      case 83:
        this.keys.down = false;
        break;
      case 37:
      case 65:
        this.keys.left = false;
        break;
      case 39:
      case 68:
        this.keys.right = false;
        break;
    }
  }

  createScene() {
    // Get the width and the height of the screen,
    // use them to set up the aspect ratio of the camera
    // and the size of the renderer.
    this.HEIGHT = window.innerHeight;
    this.WIDTH = window.innerWidth;

    // Create the scene
    this.scene = new THREE.Scene();

    // Add a fog effect to the scene; same color as the
    // background color used in the style sheet
    this.scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

    // Create the camera
    this.aspectRatio = this.WIDTH / this.HEIGHT;
    this.fieldOfView = 60;
    this.nearPlane = 1;
    this.farPlane = 10000;
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      this.aspectRatio,
      this.nearPlane,
      this.farPlane
    );

    // Set the position of the camera
    this.camera.position.x = 0;
    this.camera.position.z = 200;
    this.camera.position.y = 100;

    // Create the renderer
    this.renderer = new THREE.WebGLRenderer({
      // Allow transparency to show the gradient background
      // we defined in the CSS
      alpha: true,

      // Activate the anti-aliasing; this is less performant,
      // but, as our project is low-poly based, it should be fine :)
      antialias: true
    });

    // Define the size of the renderer; in this case,
    // it will fill the entire screen
    this.renderer.setSize(this.WIDTH, this.HEIGHT);

    // Enable shadow rendering
    this.renderer.shadowMap.enabled = true;

    // Add the DOM element of the renderer to the
    // container we created in the HTML
    this.container = document.getElementById("world");
    this.container.appendChild(this.renderer.domElement);

    let game = this;
    // Listen to the screen: if the user resizes it
    // we have to update the camera and the renderer size
    window.addEventListener(
      "resize",
      () => {
        // update height and width of the renderer and the camera
        game.HEIGHT = window.innerHeight;
        game.WIDTH = window.innerWidth;
        game.renderer.setSize(game.WIDTH, game.HEIGHT);
        game.camera.aspect = game.WIDTH / game.HEIGHT;
        game.camera.updateProjectionMatrix();
      },
      false
    );
  }

  createLights() {
    // A hemisphere light is a gradient colored light;
    // the first parameter is the sky color, the second parameter is the ground color,
    // the third parameter is the intensity of the light
    this.hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);

    // A directional light shines from a specific direction.
    // It acts like the sun, that means that all the rays produced are parallel.
    this.shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);

    // Set the direction of the light
    this.shadowLight.position.set(150, 350, 350);

    // Allow shadow casting
    this.shadowLight.castShadow = true;

    // define the visible area of the projected shadow
    this.shadowLight.shadow.camera.left = -400;
    this.shadowLight.shadow.camera.right = 400;
    this.shadowLight.shadow.camera.top = 400;
    this.shadowLight.shadow.camera.bottom = -400;
    this.shadowLight.shadow.camera.near = 1;
    this.shadowLight.shadow.camera.far = 1000;

    // define the resolution of the shadow; the higher the better,
    // but also the more expensive and less performant
    this.shadowLight.shadow.mapSize.width = 2048;
    this.shadowLight.shadow.mapSize.height = 2048;

    // to activate the lights, just add them to the scene
    this.scene.add(this.hemisphereLight);
    this.scene.add(this.shadowLight);
  }

  createSea() {
    this.sea = new Sea({
      seaColor: colors.blue
    });

    // push it a little bit at the bottom of the scene
    this.sea.mesh.position.y = -600;

    // add the mesh of the sea to the scene
    this.scene.add(this.sea.mesh);
  }

  createSky() {
    this.sky = new Sky({
      cloudColor: colors.white
    });
    this.sky.mesh.position.y = -600;
    this.scene.add(this.sky.mesh);
  }

  createGems() {
    this.gems = new THREE.Group();

    const totalgems = rand(this.MINGEMS, this.MAXGEMS);
    const stepAngle = (Math.PI * 2) / totalgems / rand(0, 10);
    const h = rand(100, 175);

    for (let i = 0; i <= totalgems; i++) {
      const gem = new Gem({ gemColor: colors.red, particleColor: colors.red });

      const a = stepAngle * i;

      gem.mesh.position.y = Math.sin(a) * h;
      gem.mesh.position.x = Math.cos(a) * h;

      gem.mesh.rotation.z = (270 * Math.PI) / 180;

      this.gems.add(gem.mesh);
    }

    this.gems.rotation.z = -2;
    this.scene.add(this.gems);
  }

  createAirplane() {
    this.airplane = new Airplane({
      cockpitColor: colors.red,
      engineColor: colors.white,
      tailColor: colors.red,
      wheelHolderColor: colors.gray,
      wheelColor: colors.black,
      sideWingColor: colors.red,
      propellerColor: colors.brown,
      bladeColor: colors.brownDark,
      bodyColor: colors.brown,
      faceColor: colors.pink,
      hairColor: colors.brown,
      glassColor: colors.brown
    });

    this.airplane.mesh.scale.set(0.25, 0.25, 0.25);
    this.airplane.mesh.position.y = 120;
    this.scene.add(this.airplane.mesh);
  }

  moveAirplane() {
    //vertical movement
    if (this.keys.up && this.airplane.mesh.position.y < 165) {
      this.airplane.mesh.position.y += this.y_speed * 1;
    } else if (this.keys.down && this.airplane.mesh.position.y > 40) {
      this.airplane.mesh.position.y += this.y_speed * -1;
    } else {
      this.airplane.mesh.position.y += this.y_speed * 0;
    }
  }

  explode(gem, color, scale, callback) {
    gem.material.color = new THREE.Color(color);
    gem.material.needsUpdate = true;
    gem.scale.set(scale, scale, scale);

    let targetX = gem.position.x + (-1 + Math.random() * 2) * 50;
    let targetY = gem.position.y + (-1 + Math.random() * 2) * 50;
    let speed = 0.6 + Math.random() * 0.2;

    TweenMax.to(gem.rotation, speed, {
      x: Math.random() * 12,
      y: Math.random() * 12
    });

    TweenMax.to(gem.scale, speed, {
      x: 0.1,
      y: 0.1,
      z: 0.1
    });

    TweenMax.to(gem.position, speed, {
      x: targetX,
      y: targetY,
      onComplete() {
        if (typeof callback !== "function") return;
        callback.call();
      }
    });
  }

  loop() {
    // Rotate the propeller,
    this.airplane.propeller.rotation.x += 0.3;

    // Rotate the sky
    this.sky.mesh.rotation.z += 0.01;

    // Animate the wawes
    this.sea.moveWaves();

    //move airplane
    this.moveAirplane();

    // Rotate the gems
    this.gems.rotation.z += 0.01;

    // check for collisions on gems
    const raycaster = new THREE.Raycaster(
      this.airplane.mesh.position.clone(),
      new THREE.Vector3(0.7, 0.4, 0)
    );

    const intersects = raycaster.intersectObjects(this.gems.children);

    intersects.forEach(gem => {
      this.explode(gem.object, colors.red, 1, () => {
        this.score += 1;
        this.gems.remove(gem.object);
        this.updateScore();
      });
    });

    // Recreate the gems
    if (!this.gems.children.length) {
      this.createGems();
    }

    // Update the pilot's hairs
    this.airplane.pilot.updateHairs();

    // render the scene
    this.renderer.render(this.scene, this.camera);

    // call the loop function again
    requestAnimationFrame(() => {
      this.loop();
    });
  }
}
