import * as THREE from "three";
import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls.js"

const $result = document.getElementById("result");

//1. Scene : 화면에서 보여주려는 객체를 담는 공간
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287);
//2. Camera : Scene을 바라볼 시점을 결정
// const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
const camera = new THREE.PerspectiveCamera(50, $result.clientWidth / $result.clientHeight, 0.1, 1000)
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0)

//3. Renderer : Scene + Camera, 화면을 그려주는 역할

const renderer = new THREE.WebGLRenderer({
    canvas: $result, antialias: true
}); // 큐브 모양 이상할 때 하는법 1
// renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setSize($result.clientWidth, $result.clientHeight);    //큐브 모양 이상할 때 하는법 2
// console.log(renderer);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff);

scene.add(light)
light.position.set(2, 4, 3)


const geometry = new THREE.DodecahedronGeometry(1);
const material = new THREE.MeshStandardMaterial({
    color: 0xffaaaa,
})


const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh)

//1. 위치
mesh.position.x = 2;
mesh.position.y = 1;
mesh.position.set(0, 2, 1);

//2. 회전
// mesh.rotation.y = 360;  //라디안 값 기준
mesh.rotation.y = THREE.MathUtils.degToRad(30);

//3. 크기
mesh.scale.x = 1.2 //1을 기준으로 크면 확대 작으면 축소
mesh.scale.y = 0.8

// axesHelper을 통해 좌표측 추가
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper)


// OrbitContorls
const controls = new OrbitControls(camera, renderer.domElement);

//조작 설정
// controls.enableZoom = false;    //확대 축소
// controls.enableRotate = false;  //마우스 카메라 회전
// controls.enablePan = false;     //컨트롤/커멘드 카메라 시점 이동

//조적 범위 지정
controls.minDistance = 2;   //최소 확대 지정
controls.maxDistance = 10;  //최대 확대 지정
// controls.maxPolarAngle = Math.PI / 3;   //회전 각도 지정

// controls.autoRotate = true; //자동 회전
// controls.autoRotateSpeed = 3    //방향과 속도 지정 + -

controls.enableDamping = true   //조금 더 부드러운 회전

//애니메이션, 반응형 항상 카메라 유지
function animate() {
    // box.rotation.y +=0.01;
    // console.log(box.rotation.y)
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