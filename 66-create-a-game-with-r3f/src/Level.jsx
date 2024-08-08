import React from 'react';
import * as THREE from 'three';

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floor1Material = new THREE.MeshStandardMaterial({ color: 'limegreen' });
const floor2Material = new THREE.MeshStandardMaterial({ color: 'greenyellow' });
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 'orangered' });
const wallMaterial = new THREE.MeshStandardMaterial({ color: 'slategrey' });

function BlockStart({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <mesh
        scale={[4, 0.2, 4]}
        geometry={boxGeometry}
        position={[0, -0.1, 0]}
        receiveShadow
      >
        <meshStandardMaterial color={'limegreen'} />
      </mesh>
    </group>
  );
}
function BlockSpinner({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <mesh
        scale={[4, 0.2, 4]}
        geometry={boxGeometry}
        position={[0, -0.1, 0]}
        receiveShadow
      >
        <meshStandardMaterial color={'limegreen'} />
      </mesh>
    </group>
  );
}
function Level() {
  return (
    <>
      <BlockStart position={[0, 0, 0]} />
    </>
  );
}

export default Level;
