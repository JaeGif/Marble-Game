import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import useGame from '../../stores/useGame';
import { Text, Float, useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

function BlockEnd({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  textRotation = [0, 0, 0],
  options = { textSize: 'l' },
}) {
  const mill = useGLTF('./models/mill.glb');
  // mill shadows
  mill.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });
  const goalRef = useRef();
  const end = useGame((state) => state.end);

  useFrame((state) => {
    if (!goalRef.current) return;

    goalRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
  });
  const handleCollisionEnter = () => {
    end();
  };

  const textSizeSwitch = () => {
    switch (options.textSize) {
      case 's':
        return 0.5;
      case 'm':
        return 3;
      case 'l':
        return 5;
      default:
        return 5;
    }
  };
  return (
    <group position={position} rotation={rotation}>
      <Text
        font='./bebas-neue-v9-latin-regular.woff'
        scale={textSizeSwitch()}
        position={[0, 3, 2]}
        rotation={textRotation}
      >
        FINISH
        <meshBasicMaterial toneMapped={false} />
      </Text>
      <Float rotationIntensity={0.5} floatIntensity={0}>
        <group ref={goalRef}>
          <RigidBody
            onCollisionEnter={handleCollisionEnter}
            type='fixed'
            colliders='hull'
            position={[0, 1.25, 0]}
            restitution={0.2}
            friction={0}
          >
            <primitive object={mill.scene} scale={1.5} />
          </RigidBody>
        </group>
      </Float>
    </group>
  );
}

export default BlockEnd;
