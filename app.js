import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import GUI from 'dat.gui';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
scene.add(directionalLight);

// Camera position
camera.position.z = 5;

// GLTF Loader
const gltfLoader = new GLTFLoader();
let model;
gltfLoader.load('path/to/your/model.gltf', (gltf) => {
    model = gltf.scene;
    scene.add(model);
    initializeGUI();
}, undefined, (error) => {
    console.error('An error happened during the loading process:', error);
});

// GUI setup
const gui = new GUI();
function initializeGUI() {
    const modelFolder = gui.addFolder('Model Controls');
    modelFolder.add(model.rotation, 'x', 0, Math.PI * 2);
    modelFolder.add(model.rotation, 'y', 0, Math.PI * 2);
    modelFolder.add(model.rotation, 'z', 0, Math.PI * 2);
    modelFolder.open();
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();