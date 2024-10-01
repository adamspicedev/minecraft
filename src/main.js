import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { World } from "./world";

// Setup the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x80a0e0);
document.body.appendChild(renderer.domElement);

// Camera setup
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight
);
camera.position.set(-32, 16, -32);

// Controls setup
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(16, 0, 16);
controls.update();

// Scene setup
const scene = new THREE.Scene();

// Lights setup
function setupLights() {
  const ambientLight = new THREE.AmbientLight();
  ambientLight.intensity = 0.1;
  scene.add(ambientLight);

  const directionalLight1 = new THREE.DirectionalLight();
  directionalLight1.position.set(1, 1, 1);
  scene.add(directionalLight1);

  const directionalLight2 = new THREE.DirectionalLight();
  directionalLight2.position.set(-1, 1, 0.5);
  scene.add(directionalLight2);
}

// Setup world
const world = new World();
world.generate();
scene.add(world);

// Render loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

setupLights();
animate();
