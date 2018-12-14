const THREE = require('three');
const FBXLoader = require('three-fbxloader-offical')
const OrbitControls = require('three-orbitcontrols')

class Game{
    constructor(){
        this.colors = {
            red:0xf25346,
            white:0xd8d0d1,
            brown:0x59332e,
            pink:0xF5986E,
            brownDark:0x23190f,
            blue:0x68c3c0,
        }

        this.createScene();
        this.createLights();
        this.createPlane();
        this.createSea();
        this.createSky();
        
        this.loop();
    }

    createScene(){}

    createLights(){}

    createPlane(){}

    createSea(){}

    createSky(){}

    loop(){}
}

window.addEventListener('load', function(){
    const game = new Game();
    //debug only
    window.game = game;
}, false);
