// Variables


// canvas
const canvas = document.getElementById("myCanvas");

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('grey');

// camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 0, 10);

// Initiate Distinct Color
const distinctColors = ['red', 'blue', 'green', 'purple', 'black'];
const minColor = 0;
const maxColor = distinctColors.length;

// Randomly pick a number in a range
const pickNumber = function(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

// Randomly pick from distinct color
const pickColor = function(){
    let randNumber = pickNumber(minColor, maxColor);
    return distinctColors[randNumber];
}

// Spawn Cube
const spawnCube = function(randColor){
    let geometry = new THREE.BoxGeometry(1,1,1);
    let material = new THREE.MeshBasicMaterial({color: new THREE.Color(randColor)});
    let box = new THREE.Mesh(geometry, material);
    box.position.x = pickNumber(-10, 10);
    box.position.y = pickNumber(-10, 10);
    box.position.z = pickNumber(-10, 10);
    scene.add(box);
}

// Testing
spawnCube(pickColor());

// Renderer
const renderer = new THREE.WebGLRenderer({canvas: canvas, alpha: true});
renderer.setSize(0.9 * window.innerWidth, 0.9 * window.innerHeight);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// orbit controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.listenToKeyEvents(window);
controls.enableDampling = true;
controls.damplingFactor = 0.5;
controls.autoRotate = false;
controls.screenSpacePanning = false;

// MainLoop
const mainloop = function(){
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(mainloop);
}

mainloop();