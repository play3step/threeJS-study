import * as THREE from "three";
import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls.js"
const { degToRad } = THREE.MathUtils;
import { OBJLoader } from './node_modules/three/examples/jsm/loaders/OBJLoader.js';



const $result = document.getElementById("result");

//1. Scene : 화면에서 보여주려는 객체를 담는 공간
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287);
//2. Camera : Scene을 바라볼 시점을 결정

const camera = new THREE.PerspectiveCamera(50, $result.clientWidth / $result.clientHeight, 0.1, 1000)
camera.position.set(2, 2, 20);

//3. Renderer : Scene + Camera, 화면을 그려주는 역할

const renderer = new THREE.WebGLRenderer({
    canvas: $result, antialias: true
}); // 큐브 모양 이상할 때 하는법 1

renderer.setSize($result.clientWidth, $result.clientHeight);    //큐브 모양 이상할 때 하는법 2

document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff);

light.position.set(3, 3, 3)
scene.add(light)


//외부 obj불러오기 
const objLoader = new OBJLoader();


objLoader.load(
    './objModels/IronMan.obj',
    (object) => {
        // 로드된 OBJ 모델을 Scene에 추가
        scene.add(object);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (error) => {
        console.error('Error loading OBJ file:', error);
    }
);




// OrbitContorls
const controls = new OrbitControls(camera, renderer.domElement);


//조적 범위 지정
controls.minDistance = 2;   //최소 확대 지정
controls.maxDistance = 1000;  //최대 확대 지정

controls.enableDamping = true   //조금 더 부드러운 회전

//애니메이션, 반응형 항상 카메라 유지
function animate() {
    renderer.render(scene, camera)
    controls.update();
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
    //1. 카메라의 종횡비
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();    //카메라의 업데이트

    //2. 렌더러의 크기
    renderer.setSize(window.innerWidth, window.innerHeight);
})