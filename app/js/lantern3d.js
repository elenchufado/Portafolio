import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
//import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
/*import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';*/


/**3D Cat first Canvas**/
//Sets usable variables for all canvas
//let mixer;
let model;
const clock = new THREE.Clock();
const container = document.getElementById( 'totem' ); //3D Cat
let height = container.clientHeight;
let width = container.clientWidth;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

document.addEventListener( 'mousemove', onDocumentMouseMove, false );
//window.addEventListener( 'resize', onWindowResize, false );

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( width, height );
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding;
container.appendChild( renderer.domElement );

//const pmremGenerator = new THREE.PMREMGenerator( renderer );

const scene = new THREE.Scene();
//Scene background
/*scene.background = new THREE.Color( 0xbfe3dd );
scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), 0.04 ).texture;*/

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.set(  0, 0, -30 ); //5, 2, 8
camera.aspect = width/height;
camera.updateProjectionMatrix();
scene.add(camera);


//Lights
const light = new THREE.AmbientLight( 0xd2dddf, 1.5 ); // soft white light
scene.add( light );
const light2 = new THREE.PointLight( 0xff0000, 10 );
light2.position.set( 0, 0, 0 );
scene.add( light2 );



//3d Model
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( 'js/libs/draco/gltf/' );

const loader = new GLTFLoader();
loader.setDRACOLoader( dracoLoader );
loader.load( 'assets/lantern2/scene.gltf', function ( gltf ) {

	model = gltf.scene;
	model.position.set( 0, 7, 0 ); //1,1,0
	model.scale.set( 15, 15, 15 );
	model.rotation.set( 0, 185.7, 0 );
	scene.add( model );


	animate();

}, undefined, function ( e ) {

	console.error( e );

} );

 function onDocumentMouseMove( event ) {

	 mouseX = ( event.clientX - windowHalfX ) / 100;
	 mouseY = ( event.clientY - windowHalfY ) / 80;

}






/**Renders whole page**/
function animate(time) {

	requestAnimationFrame( animate );

	/*positionWheel += wheelY;
	wheelY *= 0.9;
	cameraPhotos.position.y = positionWheel;*/
	model.rotation.y = time / 1000; //Model rotation
	//const delta = clock.getDelta();
	//mixer.update( delta );
	render();

}

/*function onWindowResize() {

	 let width = container.clientWidth;
	 let height = container.clientHeight;
	 camera.aspect = width / height;
	 camera.updateProjectionMatrix();
	 renderer.setSize( width, height );
	 render();
}*/

window.addEventListener('resize', () =>
{
    // Update sizes
    let width = container.clientWidth
    let height = container.clientHeight

    // Update camera
    camera.aspect = width / height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

function render() {

	camera.position.x += ( mouseX - camera.position.x ) * 1;
	camera.position.y += ( - mouseY - camera.position.y ) * 1 + 13;
	//camera.position.z += (mouseX - camera.position.z ) * 0.5 + 3;
	camera.lookAt( scene.position );
	renderer.render( scene, camera );

}
