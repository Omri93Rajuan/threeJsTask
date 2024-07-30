import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 6);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);

// Camera position
camera.position.z = 10;

const loader = new GLTFLoader();

let model;

loader.load(
    'earth.glb',(gltf) => {
        model = gltf.scene;
        model.position.set(0, 0, 0);
        scene.add(model);
    }
);




function animate() {
  
    requestAnimationFrame(animate);
if(model)
{
model.rotation.y += 0.01
}
        renderer.render(scene, camera);
}

animate();