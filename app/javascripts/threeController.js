import * as THREE from 'three';
const container = document.getElementById('threejs-container')
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { timer } from '/javascripts/timer.js'

const playButton = document.getElementById('start');
const skipButton = document.getElementById('skip');
const pomodoroButton = document.getElementById('pomodoroButton');
const shortBreakButton = document.getElementById('shortBreakButton');
const longBreakButton = document.getElementById('longBreakButton');

const RED = "#BA4A4A";
const LIGHTBLUE = "#4C9196";

document.body.style.backgroundColor = RED;

const scene = new THREE.Scene();
const initialColor = new THREE.Color(RED)
const red = new THREE.Color(RED);
const lightBlue = new THREE.Color(LIGHTBLUE);
scene.background = null;
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Color, Intensity
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
scene.add(ambientLight);
scene.add(directionalLight);

const loader = new GLTFLoader();
var tomato = null;

loader.load('./images/tomato.glb',
  function(gltf){
    tomato = gltf.scene;
    scene.add(tomato)
  },

  function (xhr) {
        console.log('Loading progress:', (xhr.loaded / xhr.total * 100) + '%');
    },

  function (error) {
        console.error('An error occurred during model loading:', error);
    }
)
const camera = new THREE.PerspectiveCamera(30, container.clientWidth / container.clientHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);


camera.position.z = 6;
camera.position.y = 0.2;

// simple animation for POC
function spin() {
  if(tomato){
      tomato.rotation.x += 0;
      tomato.rotation.y += 0.01;
  }

  renderer.render( scene, camera );
}

var up = true;
function float(){
  if(tomato){
    if(tomato.position.y >= 0.1){
      up = false;
    } 
    if(tomato.position.y <= 0){
      up = true;
    } 
    if(up){
      tomato.position.y += 0.001;
    } else {
      tomato.position.y -= 0.001;
    }
  }
  renderer.render(scene, camera);
}
 function updateAnimation(){
    if(timer.isRunning){
      renderer.setAnimationLoop(spin);
    } else {
      renderer.setAnimationLoop(float);
    }
  }

renderer.setAnimationLoop(float);

/*
Temp solution to show off tomato animation before implementation of callback function in timer

tomato will keep spinning after timer goes off
*/

playButton.addEventListener('click', () => {
    timer.startTimer();
    updateAnimation();
});

skipButton.addEventListener('click', () =>  {
    timer.stopTimer();
    updateAnimation();
});

pomodoroButton.addEventListener('click', () => {
    timer.setpomodoro();
    timer.pauseTimer();
    updateAnimation();
})

shortBreakButton.addEventListener('click', () => {
    timer.setShortBreak();
    timer.pauseTimer();
    updateAnimation();
});

longBreakButton.addEventListener('click', () => {
    timer.setLongBreak();
    timer.pauseTimer();
    updateAnimation();
});
