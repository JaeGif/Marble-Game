import React from 'react';
import * as THREE from 'three';
import { RigidBody } from '@react-three/rapier';

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floor1Material = new THREE.MeshStandardMaterial({ color: 'limegreen' });
const floor2Material = new THREE.MeshStandardMaterial({ color: 'greenyellow' });

function BlockFloor({
  position,
  rotation = [0, 0, 0],
  scale = { x: 1, y: 1, z: 1 },
  type,
}) {
  let material = floor2Material;
  switch (type) {
    case 'start':
      material = floor1Material;
      break;
    case 'end':
      material = floor1Material;
      break;

    default:
      material = floor2Material;
  }
  return (
    <group position={position} rotation={rotation}>
      <RigidBody type='fixed' colliders='cuboid' restitution={0.2} friction={0}>
        <mesh
          scale={[4 * scale.x, 0.2 * scale.y, 4 * scale.z]}
          geometry={boxGeometry}
          position={[0, -0.1, 0]}
          material={material}
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

export default BlockFloor;
