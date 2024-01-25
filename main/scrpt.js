import * as THREE from 'three';
import { STLLoader } from 'three/addons/loaders/STLLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Scene
const scene = new THREE.Scene();

// Sphere

// const geometry = new THREE.SphereGeometry(3, 16, 16);

const loader = new STLLoader()

loader.load(
  './assets/moai.stl',
  function (geometry) {
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.5,
      metalness: 0.5,
      reflectivity: 0.5,
    });

    const mesh = new THREE.Mesh(geometry, material)
    // mesh.position.set(0, 0, 0)
    mesh.scale.set(0.1, 0.1, 0.1);
    mesh.translateX(-7.5)
    mesh.translateY(-8)
    scene.add(mesh)
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
  },
  (error) => {
    console.log(error)
  }
)

const geometry = new THREE.PlaneGeometry(30, 30);
geometry.translate(0, 0, -1)
const material = new THREE.MeshPhysicalMaterial({
  color: 0x1100ff,
  roughness: 0.5,
  metalness: 0.5,
  reflectivity: 0.5,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Light
const light1 = new THREE.PointLight(0xffffff, 1, 100);
light1.position.set(0, 10, 10);
const light2 = new THREE.PointLight(0xffffff, 1, 100);
light2.position.set(10, 0, 10);
const light3 = new THREE.PointLight(0xffffff, 1, 100);
light3.position.set(10, 10, 0);
const light4 = new THREE.PointLight(0xffffff, 1, 100);
light3.position.set(0, 0, -20);
const light5 = new THREE.PointLight(0xffffff, 1, 100);
light5.position.set(0, 20, -15);
scene.add(light1);
scene.add(light2);
scene.add(light3);
scene.add(light4);

const aLight = new THREE.AmbientLight(0x151515);
scene.add(aLight);

// Camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight);
camera.position.z = 20;
scene.add(camera);

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
renderer.setClearColor(0xeeeeee);

// Resize 
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
});


// Animation Loop
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
let angle = 0;
const loop = () => {

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
}
loop();

scene.add(new THREE.AxesHelper(10));
scene.add(new THREE.PointLightHelper(light1));
scene.add(new THREE.PointLightHelper(light2));
scene.add(new THREE.PointLightHelper(light3));
scene.add(new THREE.PointLightHelper(light4));
scene.add(new THREE.PointLightHelper(light5));

// scene.add(new THREE.DirectionalLightHelper(light));
// scene.add(new THREE.SpotLightHelper(light));
scene.add(new THREE.GridHelper(10, 15));