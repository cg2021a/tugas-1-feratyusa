// Variables
let score = 0;
let scoreDOM = document.getElementById('score');
scoreDOM.innerHTML = score;
// let score = 0

let selected0 = {
    color: null,
    object: null,
};
let selected1 = {
    color: null,
    object: null,
};
const MAX_CUBE = 30;
const customSizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

let total_cube = 0;

// canvas
const canvas = document.getElementById("myCanvas");

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('black');

// camera
const camera = new THREE.PerspectiveCamera(75, customSizes.width / customSizes.height, 1, 1000);
camera.position.set(0, 0, 40);

// raycast mouse
const rayCast = new THREE.Raycaster();
const mouse = new THREE.Vector2();
mouse.x = mouse.y = -1;

// Define Distinct Color
const distinctColors = ['red', 'blue', 'green', 'purple'];
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

// Spawn Plane
const spawnPlane = function(){
    let geometry = new THREE.PlaneGeometry(80, 80);
    let material = new THREE.MeshBasicMaterial({color: new THREE.Color('white')});
    let plane = new THREE.Mesh(geometry, material);
    plane.position.set(0, -30, 0);
    plane.rotation.x = Math.PI * -0.5;
    scene.add(plane);
}

// Spawn Cube
const spawnCube = function(randColor){
    let geometry = new THREE.BoxGeometry(3, 3, 3);
    let material = new THREE.MeshBasicMaterial({color: new THREE.Color(randColor)});
    let box = new THREE.Mesh(geometry, material);
    box.position.x = pickNumber(-20, 20);
    box.position.y = pickNumber(-20, 20);
    box.position.z = pickNumber(-20, 20);
    scene.add(box);
}

// Chcek if selected is same color
const checkSelected = function(){
    if(selected0.color.equals(selected1.color) && selected0.object != selected1.object){

        // Remove the two object
        scene.remove(selected0.object); scene.remove(selected1.object);
        selected0.object.geometry.dispose();
        selected0.object.material.dispose();
        selected1.object.geometry.dispose();
        selected1.object.material.dispose();

        selected0.object = null; selected0.color = null;
        selected1.object = null; selected1.color = null;

        total_cube -= 2;
        score++;
        scoreDOM.innerHTML = score;
        // console.log("Your Score: "+score);
    }
    else{
        // Revert the object back to its original color
        // selected0.object.material.color = selected0.color;
        // selected1.object.material.color = selected1.color;

        selected0.object = null; selected0.color = null;
        selected1.object = null; selected1.color = null;

        return;
    };
}

// Mouseclik event
let onMouseClick = function(e) {
    mouse.x = (e.clientX / customSizes.width) * 2 - 1;
    mouse.y = - (e.clientY / customSizes.height) * 2 + 1;

    rayCast.setFromCamera(mouse, camera);
    let intersects = rayCast.intersectObjects(scene.children, false);
    intersects.forEach(obj => {
        if(! (obj.object.material.color.equals(new THREE.Color('white'))) ){
            if( selected0.color === null ){
                selected0.color = obj.object.material.color;
                selected0.object = obj.object;
            }
            else if( selected1.color === null ){
                selected1.color = obj.object.material.color;
                selected1.object = obj.object;
                
                checkSelected();
            }
        }
    });
};

// Renderer
const renderer = new THREE.WebGLRenderer({canvas: canvas, alpha: true});
renderer.setSize(customSizes.width, customSizes.height);

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

// Orbit controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.listenToKeyEvents(window);
controls.enableDampling = true;
controls.update();
controls.damplingFactor = 0.5;

// Testing
let spawn_cube = 0;
let spawn_cd = 100;
const spawn_rate = 0.5;
spawnPlane();

// MainLoop
const mainloop = function(){

    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    if(total_cube < MAX_CUBE){
        if(spawn_cube == spawn_cd){
            const color = pickColor();
            spawnCube(color);
            total_cube++;
            if(spawn_cd > 10)
                spawn_cd -= 5;
            spawn_cube = 0;
        }
        spawn_cube += spawn_rate;
    }

    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(mainloop);
}

mainloop();