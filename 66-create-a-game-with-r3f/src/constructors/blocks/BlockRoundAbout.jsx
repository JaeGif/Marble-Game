import React from 'react';
import { RigidBody } from '@react-three/rapier';
import { useGLTF } from '@react-three/drei';

function BlockRoundAbout({
  position,
  rotation = [0, 0, 0],
  scale = { x: 1, y: 1, z: 1 },
  type,
}) {
  const { nodes } = useGLTF('./models/roundabout.glb');
  const geometry = nodes.Cylinder.geometry;
  position[1] -= 0.1;
  return (
    <group position={position} rotation={rotation}>
      <RigidBody
        type='fixed'
        colliders='trimesh'
        restitution={0.2}
        friction={0}
      >
        <mesh
          scale={[4 * scale.x, 0.1 * scale.y, 4 * scale.z]}
          geometry={geometry}
          material={floor2Material}
          position={[0, 0, 0]}
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}
export default BlockRoundAbout;
