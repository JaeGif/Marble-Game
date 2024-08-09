import React from 'react';
import { RigidBody } from '@react-three/rapier';

function Player() {
  return (
    <RigidBody
      canSleep={false}
      restitution={0.2}
      friction={1}
      colliders='hull'
      position={[0, 1, 0]}
    >
      <mesh castShadow receiveShadow>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial flatShading color={'mediumpurple'} />
      </mesh>
    </RigidBody>
  );
}

export default Player;
