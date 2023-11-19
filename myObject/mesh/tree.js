import * as THREE from "three";

export function printTree() {

    // 나무 만들기
    const tree = new THREE.Group();

    const trunk = new THREE.Group();    //그룹으로 저장


    const trunkMaterial = new THREE.MeshStandardMaterial({
        color: 0xa38049
    })

    const trunkGeometry = new THREE.CylinderGeometry(0.8, 1, 1.5);

    const trunk1 = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.add(trunk1)

    const trunk2 = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk2.position.set(0.1, 1.3, 0);
    trunk2.scale.set(0.9, 0.9, 0.9);
    trunk2.rotation.z = THREE.MathUtils.degToRad(-5);
    trunk.add(trunk2)

    const trunk3 = new THREE.Mesh(trunkGeometry, trunkMaterial);

    trunk3.position.set(0.2, 2.5, 0);
    trunk3.scale.set(0.8, 0.8, 0.8);
    trunk3.rotation.z = THREE.MathUtils.degToRad(-5);
    trunk.add(trunk3)

    const trunk4 = new THREE.Mesh(trunkGeometry, trunkMaterial);

    trunk4.position.set(0.3, 3.5, 0);
    trunk4.scale.set(0.7, 0.7, 0.7);
    trunk4.rotation.z = THREE.MathUtils.degToRad(-8);
    trunk.add(trunk4)

    tree.add(trunk);

    //나뭇잎

    const leaf = new THREE.Group()

    const leafMaterial = new THREE.MeshStandardMaterial({
        color: 0x84ad88,
        side: THREE.DoubleSide
    })
    const leafGeometry = new THREE.SphereGeometry(2, 32, 16, Math.PI / 3, Math.PI / 3)
    const leaf1 = new THREE.Mesh(leafGeometry, leafMaterial);
    leaf1.rotation.x = Math.PI / -2;
    leaf1.position.set(0, 3.2, 2);
    leaf.add(leaf1);

    const leaf2 = new THREE.Mesh(leafGeometry, leafMaterial);
    leaf2.rotation.reorder
    leaf2.rotation.x = Math.PI / -2;
    leaf2.rotation.z = Math.PI / 2;
    leaf2.position.set(2, 3.2, 0);
    leaf.add(leaf2);

    const leaf3 = new THREE.Mesh(leafGeometry, leafMaterial);
    leaf3.rotation.x = Math.PI / -2;
    leaf3.rotation.z = Math.PI;
    leaf3.position.set(0, 3.2, -2);
    leaf.add(leaf3);

    const leaf4 = new THREE.Mesh(leafGeometry, leafMaterial);
    leaf4.rotation.x = Math.PI / -2;
    leaf4.rotation.z = Math.PI / -2;
    leaf4.position.set(-2, 3.2, 0);
    leaf.add(leaf4);

    tree.add(leaf);

    leaf.position.x = -0.4;
    leaf.rotation.z = THREE.MathUtils.degToRad(-10);


    return tree;

}