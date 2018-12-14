const THREE = require('three');
const FBXLoader = require('three-fbxloader-offical')
const OrbitControls = require('three-orbitcontrols')

class Game{
    constructor(){
        let game = this;
<<<<<<< HEAD

        let container = document.createElement('div');
        document.body.appendChild(container);

=======

        let container = document.createElement('div');
        document.body.appendChild(container);

>>>>>>> ea542bd74a2936d59e62804399d1f354c12ae5db
        this.assetsPath = "./models";
        this.mixers = [];

        this.clock = new THREE.Clock();

        this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
        this.camera.position.set(0,0,0);

        this.controls = new THREE.OrbitControls(this.camera);
        this.controls.target.set(100, 0, 0);
        this.controls.update();

        this.scene = new THREE.Scene();
<<<<<<< HEAD
        this.scene.background = new THREE.Color(0xa0a0a0);
        this.scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);

        let h_light = new THREE.HemisphereLight(0xffffff, 0x444444);
        h_light.position.set(0, 200, 0);
        this.scene.add(h_light);

        let d_light = new THREE.DirectionalLight(0xffffff);
        d_light.position.set(0, 200, 100);
=======
        this.scene.background = new THREE.Color( 0xa0a0a0 );
        this.scene.fog = new THREE.Fog( 0xa0a0a0, 200, 1000 );

        let h_light = new THREE.HemisphereLight( 0xffffff, 0x444444 );
        h_light.position.set( 0, 200, 0 );
        this.scene.add( h_light );

        let d_light = new THREE.DirectionalLight( 0xffffff );
        d_light.position.set( 0, 200, 100 );
>>>>>>> ea542bd74a2936d59e62804399d1f354c12ae5db
        d_light.castShadow = true;
        d_light.shadow.camera.top = 180;
        d_light.shadow.camera.bottom = - 100;
        d_light.shadow.camera.left = - 120;
        d_light.shadow.camera.right = 120;
<<<<<<< HEAD
        this.scene.add(d_light);
=======
        this.scene.add( d_light );
>>>>>>> ea542bd74a2936d59e62804399d1f354c12ae5db

        let mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
        mesh.rotation.x = - Math.PI / 2;
        mesh.receiveShadow = true;
        this.scene.add(mesh);

        let grid = new THREE.GridHelper( 2000, 20, 0x000000, 0x000000 );
        grid.material.opacity = 0.2;
        grid.material.transparent = true;
        this.scene.add(grid);

        let loader = new THREE.FBXLoader();
        loader.load(`${this.assetsPath}/fbx/walk.fbx`, function(object){
            object.mixer = new THREE.AnimationMixer(object);
            game.mixers.push(object.mixer);

            let action = object.mixer.clipAction(object.animations[0]);
            action.play();
            object.traverse( function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            } );
            game.scene.add(object);
        });

<<<<<<< HEAD
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize(window.innerWidth, window.innerHeight);
=======
        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
>>>>>>> ea542bd74a2936d59e62804399d1f354c12ae5db
        this.renderer.shadowMap.enabled = true;
    
        container.appendChild(this.renderer.domElement);

        this.animate();
    }

    animate(){
        let game = this;
        requestAnimationFrame(function(){game.animate();});
        if (this.mixers.length > 0) {
            for (var i = 0; i < this.mixers.length; i ++) {
<<<<<<< HEAD
                this.mixers[i].update(this.clock.getDelta());
=======
                this.mixers[ i ].update( this.clock.getDelta());
>>>>>>> ea542bd74a2936d59e62804399d1f354c12ae5db
            }
        }
        this.renderer.render(this.scene, this.camera);
    }
}

const game = new Game();