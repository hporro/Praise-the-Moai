import * as THREE from 'three';
import { STLLoader } from 'three/addons/loaders/STLLoader.js'
import { ArcballControls } from 'three/addons/controls/ArcballControls.js';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
scene.fog = new THREE.Fog(0xffffff, 0, 750);

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

loader.load(
  './assets/man.stl',
  function (geometry) {
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xeb34a8,
      roughness: 0.5,
      metalness: 0.5,
      reflectivity: 0.5,
    });
    geometry.translate(10, 0, 0)
    const mesh = new THREE.Mesh(geometry, material)
    // mesh.position.set(0, 0, 0)
    mesh.scale.set(0.5, 0.5, 0.5);
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

const light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 2.5);
light.position.set(0.5, 1, 0.75);
scene.add(light);

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
camera.position.z = 20;
scene.add(camera);

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

// Resize 
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
});


// Animation Loop
const controls = new ArcballControls(camera, canvas);
controls.enableDamping = true;
let angle = 0;
const loop = () => {
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