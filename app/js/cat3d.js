import * as THREE from 'three/build/three.module.js';
//import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
	GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
	DRACOLoader
} from 'three/examples/jsm/loaders/DRACOLoader.js';
import {
	RectAreaLightHelper
} from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import {
	RectAreaLightUniformsLib
} from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';

/**3D Cat first Canvas**/
//Sets usable variables for all canvas
let mixer;
let model;
const clock = new THREE.Clock();
const container = document.getElementById('cat3d'); //3D Cat
let height = container.clientHeight;
let width = container.clientWidth;
let mouseX = 0,
	mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', onDocumentMouseMove, false);
//window.addEventListener( 'resize', onWindowResize, false );

const renderer = new THREE.WebGLRenderer({
	antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.shadowMap.enabled = false;
renderer.shadowMap.autoUpdate = false;
renderer.shadowMap.type = THREE.BasicShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding;
container.appendChild(renderer.domElement);

//const pmremGenerator = new THREE.PMREMGenerator( renderer );

const scene = new THREE.Scene();
//Scene background
/*scene.background = new THREE.Color( 0xbfe3dd );
scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), 0.04 ).texture;*/

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(10, 15, -30); //5, 2, 8
camera.aspect = width / height;
camera.updateProjectionMatrix();
scene.add(camera);


//Lights
RectAreaLightUniformsLib.init();

const rectLight1 = new THREE.RectAreaLight(0x00ffff, 5, 4, 15);
rectLight1.position.set(-5, 0, 5);
scene.add(rectLight1);

const rectLight2 = new THREE.RectAreaLight(0xfa6e98, 5, 4, 15);
rectLight2.position.set(0, 0, 5);
scene.add(rectLight2);

const rectLight3 = new THREE.RectAreaLight(0xd1d1d1, 5, 4, 15);
rectLight3.position.set(5, 0, 5);
scene.add(rectLight3);

//Light's material effect with helpers
scene.add(new RectAreaLightHelper(rectLight1));
scene.add(new RectAreaLightHelper(rectLight2));
scene.add(new RectAreaLightHelper(rectLight3));

const geoFloor = new THREE.BoxGeometry(16, 0.1, 10);
const matStdFloor = new THREE.MeshStandardMaterial({
	color: 0x808080,
	roughness: 0.1,
	metalness: 0
});
const mshStdFloor = new THREE.Mesh(geoFloor, matStdFloor);
mshStdFloor.position.set(0, -3, 0);
scene.add(mshStdFloor);

//3d Model
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('js/libs/draco/gltf/');

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);
// Don't get 3d file on mobile
let viewportWidth = window.innerWidth || document.documentElement.clientWidth;
if (viewportWidth > 642) {
	loader.load('/luckyCat/cat10.gltf', function (gltf) {

		model = gltf.scene;
		model.position.set(0, 0, 0); //1,1,0
		model.scale.set(0.02, 0.02, 0.02);
		model.rotation.set(0, 185.7, 0);
		scene.add(model);
	
		mixer = new THREE.AnimationMixer(model);
		mixer.clipAction(gltf.animations[0]).play();
	
		animate();
	
	}, undefined, function (e) {
	
		console.error(e);
	
	});
	console.log('3D Cat Render');
} else {
	console.log('3D Cat N/A');
}

function onDocumentMouseMove(event) {

	mouseX = (event.clientX - windowHalfX) / 100;
	mouseY = (event.clientY - windowHalfY) / 80;

}

/**Renders whole page**/
function animate(time) {

	requestAnimationFrame(animate);

	/*positionWheel += wheelY;
	wheelY *= 0.9;
	cameraPhotos.position.y = positionWheel;*/
	//model.rotation.y = time / 1000; //Model rotation
	const delta = clock.getDelta();
	mixer.update(delta);
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

window.addEventListener('resize', () => {
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

	camera.position.x += (mouseX - camera.position.x) * 1;
	camera.position.y += (-mouseY - camera.position.y) * 1 + 13;
	//camera.position.z += (mouseX - camera.position.z ) * 0.5 + 3;
	camera.lookAt(scene.position);
	renderer.render(scene, camera);

}