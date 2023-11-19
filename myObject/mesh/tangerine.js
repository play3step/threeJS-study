import * as THREE from "three";


export function printTangerine() {
    //한라봉 만들기
    const tangerine = new THREE.Group();

    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0xff7f00,

    })

    const battomGeometry = new THREE.DodecahedronGeometry(2, 1);

    const bottom = new THREE.Mesh(battomGeometry, bodyMaterial);

    tangerine.add(bottom)


    const topGeometry = new THREE.TetrahedronGeometry(0.8, 3);
    const top = new THREE.Mesh(topGeometry, bodyMaterial)
    tangerine.add(top);
    top.position.y = 1.7;

    const leafMaterial = new THREE.MeshStandardMaterial({
        color: 0x00800,
        side: THREE.DoubleSide
    })

    const stemGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.4);
    const stem = new THREE.Mesh(stemGeometry, leafMaterial);
    tangerine.add(stem)
    stem.position.y = 2.5;

    const leafGeometry = new THREE.SphereGeometry(0.5, 32, 16, 0, Math.PI / 3);
    const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
    tangerine.add(leaf)
    leaf.position.set(-0.5, 2.4, -0.1);
    leaf.rotation.z = Math.PI / -2;

    return tangerine;

}