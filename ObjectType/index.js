import * as THREE from "three";

const $result = document.getElementById("result");

//1. Scene : 화면에서 보여주려는 객체를 담는 공간
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287);
//2. Camera : Scene을 바라볼 시점을 결정
// const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
const camera = new THREE.PerspectiveCamera(50, $result.clientWidth / $result.clientHeight, 0.1, 1000)
camera.position.set(2, 2, 2);
camera.lookAt(0,0,0)

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
light.position.set(2,4,3)





const geometry = new THREE.BoxGeometry(1,1,1);

const basic = new THREE.MeshBasicMaterial({ //빛의 영향 X 단색으로 나타냄
    color: 0xffaaaa, //색상
    // wireframe: true, //geometry 형채를 볼 수 있다.
    transparent: false,  //투명도 사용여부
    opacity: 0.5, //투명도 설정

})

const standard = new THREE.MeshStandardMaterial({   //가장 많이 사용됨, 물리 기반 렌더링
    color: 0xffaaaa,
    roughness: 0.2, //거칠기 표현
    metalness: 0.8, //금속성 표현
    // map: //다양한 텍스쳐 적용가능
    side: THREE.DoubleSide//렌더링 할 면 지정
})

const physical = new THREE.MeshPhysicalMaterial({   //standard 확장 버전, 고급물리 기반 렌더링
    color: 0xffaaaa,
    clearcoat: 0.8,
    clearcoatRoughness: 0.2,    //빛 반사 등등
})

const phong = new THREE.MeshPhongMaterial({     //광택있는 표면을 표현할 때 사용
    color: 0xffaaaa,
    shininess: 30,  //물체의 광택 정도 지정
    specular: 0x2e6ff2 //물체가 반사하는 빛의 색상
})

const mesh = new THREE.Mesh(geometry, phong)
scene.add(mesh);



// const material = new THREE.MeshStandardMaterial({
//     color: 0x2E6FF2
// })
//육면체
// const geo1 = new THREE.BoxGeometry(1,1,1);
// const obj1 = new THREE.Mesh(geo1, material);
// scene.add(obj1);

//원뿔
// const geo2 = new THREE.ConeGeometry(0.5, 1, 4);
// const obj2 = new THREE.Mesh(geo2, material);
// scene.add(obj2)

//원기둥
// const geo3= new THREE.CylinderGeometry(0.5, 0.8, 1);
// const obj3 = new THREE.Mesh(geo3, material);
// scene.add(obj3)

//구
// const geo4= new THREE.SphereGeometry(1);
// const obj4 = new THREE.Mesh(geo4, material);
// scene.add(obj4);

//평면
// const geo5= new THREE.PlaneGeometry(1, 2);
// const obj5 = new THREE.Mesh(geo5, material);
// scene.add(obj5);

//원
// const geo6= new THREE.CircleGeometry(1, 32);
// const obj6 = new THREE.Mesh(geo6, material);
// scene.add(obj6);

//튜브
// const geo7= new THREE.TorusGeometry(1, 0.3);
// const obj7 = new THREE.Mesh(geo7, material);
// scene.add(obj7);



renderer.render(scene, camera)


//애니메이션, 반응형 항상 카메라 유지
function animate(){
    // box.rotation.y +=0.01;
    // console.log(box.rotation.y)
    renderer.render(scene, camera)

    requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', ()=>{
    //1. 카메라의 종횡비
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();    //카메라의 업데이트

    //2. 렌더러의 크기
    renderer.setSize(window.innerWidth, window.innerHeight);
})