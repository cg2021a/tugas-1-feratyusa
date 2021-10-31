// import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';

// import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js';
// import {OBJLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/OBJLoader.js';
// import {MTLLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/MTLLoader.js';

// Variables
const customSizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// canvas
const canvas = document.getElementById("c");

// scene and fog
const scene = new THREE.Scene();
const near = 10;
const far = 20;
const color = "lightblue";
scene.fog = new THREE.Fog(color, near, far);
scene.background = new THREE.Color(color);

// camera
const camera = new THREE.PerspectiveCamera(75, customSizes.width / customSizes.height, 1, 1000);
camera.position.set(0, 2, 0);

// Spawn Plane
const spawnPlane = function () {
  let geometry = new THREE.PlaneGeometry(80, 80);
  let material = new THREE.MeshPhongMaterial({ 
      color: new THREE.Color("white"),
      side: THREE.DoubleSide
    });
  let plane = new THREE.Mesh(geometry, material);
  plane.receiveShadow = true;
  plane.position.set(0, -3, 0);
  plane.rotation.x = Math.PI * -0.5;
  scene.add(plane);
};

// Spawn Box
const spawnBox = function (x, z) {
  let geometry = new THREE.BoxGeometry(5, 5, 5);
  let material = new THREE.MeshPhongMaterial({ 
      color: new THREE.Color("red"),
    });
  let box = new THREE.Mesh(geometry, material);
  box.receiveShadow = true;
  box.castShadow = true;
  box.position.set(x, 0, z);
  scene.add(box);
};

// Spawn Object
// const spawnObject = function (x, z){
//     const mtlLoader = new MTLLoader();
//     mtlLoader.load('object/cmmode.mtl', (mtl) => {
//       mtl.preload();
//       const objLoader = new OBJLoader();
//       objLoader.setMaterials(mtl);
//       objLoader.load('object/cmmode.obj', (root) => {
//         scene.add(root);
//       });
//     });
// };

// Light
const light = new THREE.PointLight(0xffffff, 1);
light.castShadow = true;
light.position.set(0, 12, 0);
scene.add(light);

// Mouseclik event
let onMouseClick = function (e) {};

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(customSizes.width, customSizes.height);
renderer.shadowMap.enabled = true;

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

// Event Listener
document.addEventListener("click", onMouseClick, false);

// PointerLockControl
const controls = new THREE.PointerLockControls(camera, canvas);
const menu = document.getElementById("menu");
menu.addEventListener("click", function () {
  controls.lock();
});
controls.addEventListener("lock", function () {
  menu.style.display = "none";
});
controls.addEventListener("unlock", function () {
  menu.style.display = "block";
});

// Keyboard Event
const w = 87,
  a = 65,
  s = 83,
  d = 68;

const speed = 1;
const onKeyDown = function (e) {
  switch (e.keyCode) {
    case w:
      camera.position.z += speed;
      break;
    case a:
      camera.position.x += -speed;
      break;
    case s:
      camera.position.z += -speed;
      break;
    case d:
      camera.position.x += speed;
      break;
  }
};
document.addEventListener("keydown", onKeyDown, false);

// Skybox
const loader = new THREE.TextureLoader();
const texture = loader.load("space2.jpg", () => {
  const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
  rt.fromEquirectangularTexture(renderer, texture);
  scene.background = rt.texture;
});

// Testing
spawnPlane();
spawnBox(4, 5);
// spawnObject();

// MainLoop
const mainloop = function () {
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  renderer.render(scene, camera);
//   controls.update();
  requestAnimationFrame(mainloop);
};

mainloop();
