import React from 'react';
import * as THREE from 'three';
import { RigidBody } from '@react-three/rapier';

import useGame from '../../stores/useGame';

const flipGravityMaterial = new THREE.MeshStandardMaterial({ color: 'pink' });

function BlockFlipGravity({ position, rotation = [0, 0, 0], type }) {
  // when player crosses this block, gravity is inverted

  const gravityDirection = useGame((state) => state.gravityDirection);
  const setGravityDirection = useGame((state) => state.setGravityDirection);

  const handleGravityFlip = () => {
    const flipped = gravityDirection === -1 ? 1 : -1;
    setGravityDirection(flipped);
  };
  return (
    <group position={position} rotation={rotation}>
      <RigidBody
        type='fixed'
        onCollisionEnter={handleGravityFlip}
        onIntersectionEnter={handleGravityFlip}
        colliders={'cuboid'}
      >
        <mesh
          scale={[4, 0.2, 4]}
          geometry={boxGeometry}
          material={flipGravityMaterial}
          position={[0, -0.1, 0]}
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

export default BlockFlipGravity;
