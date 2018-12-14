const THREE = require('three');
const FBXLoader = require('three-fbxloader-offical')
const OrbitControls = require('three-orbitcontrols')
import Sea from './Sea';
import Cloud from './Cloud';
import sky from './Sky';
import Sky from './Sky';

class Game{
    constructor(){
        /**  
        *   MAIN VARIABLES DEFINITION
        **/
        // colors
        this.colors = {
            red:0xf25346,
            white:0xd8d0d1,
            brown:0x59332e,
            pink:0xF5986E,
            brownDark:0x23190f,
            blue:0x68c3c0,
            orange:0xf7d9aa
        }

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

        // main methods
        this.createScene();
        this.createLights();
        this.createPlane();
        this.createSea();
        this.createSky();
        
        //main game loop
        this.loop();
    }

    createScene(){
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
        this.container = document.getElementById('world');
        this.container.appendChild(this.renderer.domElement);
        
        let game = this;
        // Listen to the screen: if the user resizes it
        // we have to update the camera and the renderer size
        window.addEventListener('resize', function(){
            console.log('residzed');
            // update height and width of the renderer and the camera
            game.HEIGHT = window.innerHeight;
            game.WIDTH = window.innerWidth;
            game.renderer.setSize(game.WIDTH, game.HEIGHT);
            game.camera.aspect = game.WIDTH / game.HEIGHT;
            game.camera.updateProjectionMatrix();
        }.bind(game), false);
    }

    createLights(){
        // A hemisphere light is a gradient colored light; 
        // the first parameter is the sky color, the second parameter is the ground color, 
        // the third parameter is the intensity of the light
        this.hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)
        
        // A directional light shines from a specific direction. 
        // It acts like the sun, that means that all the rays produced are parallel. 
        this.shadowLight = new THREE.DirectionalLight(0xffffff, .9);

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

    createSea(){
        this.sea = new Sea(THREE, this.colors);

        // push it a little bit at the bottom of the scene
        this.sea.mesh.position.y = -600;

        // add the mesh of the sea to the scene
        this.scene.add(this.sea.mesh);
    }

    createSky(){
        this.sky = new Sky(THREE, Cloud, this.colors);
        this.sky.mesh.position.y = -600;
	    this.scene.add(this.sky.mesh);
    }

    createPlane(){}

    loop(){}
}

window.addEventListener('load', function(){
    const game = new Game();
    //debug only
    window.game = game;
}, false);
