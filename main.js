import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

// Globals
let sun;

// Setup renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
// Setup scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 2;

const texture = new THREE.TextureLoader().load( "utils/circle.png" );
const vertices = [];
for ( let i = 0; i < 25000; i ++ ) {
	const x = THREE.MathUtils.randFloatSpread( 3000 );
	const y = THREE.MathUtils.randFloatSpread( 3000 );
	const z = THREE.MathUtils.randFloatSpread( 3000 );

	vertices.push( x, y, z );
}
const geometry = new THREE.BufferGeometry();
geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
const material = new THREE.PointsMaterial( { color: 0xffffff, map: texture, size: 1.7, sizeAttenuation: true } );
const points = new THREE.Points( geometry, material );
scene.add(points)

const loader = new GLTFLoader();
loader.load('utils/sun.glb', function(gltf) {
    sun = gltf.scene
	scene.add(sun);
});


function animate() {
    if(sun)
    {
        sun.rotation.x += 0.002;
        sun.rotation.y += 0.002;
        sun.rotation.z += 0.002;
    }

    camera.position.z -= 2;
    if(camera.position.z < -1000)
    {
        camera.position.z = -10
    }
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );
