var THREE = require('three');

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

var animate = function () {
    requestAnimationFrame(animate);

    //cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;
    
    //cube.position.x += 0.01;
    //camera.position.z += 0.05;
    
    renderer.render(scene, camera);
};

animate();


class Pippo{
    constructor(){
        this.getInfo(["a", "h"], ["a", "h"])
    }
    getInfo(c,d){
        const  r = [...c, ...d]
    }
}

let pippo = new Pippo()