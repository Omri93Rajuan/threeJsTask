import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 6);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);

camera.position.set(0, 10, 20);

const controls = new OrbitControls(camera, renderer.domElement);

const loader = new GLTFLoader();
let model;
loader.load(
    'cute_dragon.glb',(gltf) => {
        model = gltf.scene;
        model.position.set(0, 0, 0);
        scene.add(model);
    }
);

function animate() {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
