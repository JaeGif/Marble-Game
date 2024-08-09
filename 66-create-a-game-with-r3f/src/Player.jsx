import React from 'react';
import { RigidBody } from '@react-three/rapier';

function Player(props) {
  return (
    <RigidBody
      canSleep={false}
      restitution={0.2}
      friction={1}
      colliders='ball'
      position={[0, 1, 0]}
    >
      <mesh castShadow receiveShadow>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial
          map={props.map}
          metalnessMap={props.metalnessMap}
          normalMap={props.normalMap}
          roughnessMap={props.roughnessMap}
          aoMap={props.aoMap}
        />
      </mesh>
    </RigidBody>
  );
}

export default Player;
