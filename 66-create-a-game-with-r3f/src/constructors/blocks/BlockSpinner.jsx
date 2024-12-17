import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 'orangered' });
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

function BlockSpinner({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = { x: 1, y: 1, z: 1 },
}) {
  const [speed] = useState(
    () => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1)
  );

  const obstacleRef = useRef();
  useFrame((state) => {
    if (!obstacleRef.current) return;

    const time = state.clock.getElapsedTime();
    const rotation = new THREE.Quaternion();
    rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));
    obstacleRef.current.setNextKinematicRotation(rotation);
  });

  return (
    <group position={position} rotation={rotation}>
      <RigidBody
        ref={obstacleRef}
        type='kinematicPosition'
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3.5 * scale.x, 0.3 * scale.y, 0.3 * scale.z]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

export default BlockSpinner;
