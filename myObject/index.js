import * as THREE from "three";
import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls.js"
const { degToRad } = THREE.MathUtils;
import { printTree } from "./mesh/tree.js";
import { printTangerine } from "./mesh/tangerine.js";

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

const tangerine1 = printTangerine();
scene.add(tangerine1)
tangerine1.scale.set(0.8, 0.8, 0.8);
tangerine1.position.x = 4; 

const tree1 = printTree()
scene.add(tree1);

// OrbitContorls
const controls = new OrbitControls(camera, renderer.domElement);


//조적 범위 지정
controls.minDistance = 2;   //최소 확대 지정
controls.maxDistance = 100;  //최대 확대 지정

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