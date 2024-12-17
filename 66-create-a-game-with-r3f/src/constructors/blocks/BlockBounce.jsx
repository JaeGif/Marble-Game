import React, { useRef } from 'react';
import * as THREE from 'three';
import { RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';

const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 'orangered' });

function BlockBounce({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  options = { amplitude: 1, speed: 5, seed: Math.random() * 3 },
}) {
  const obstacleRef = useRef();

  const bounceMotion = (time, amplitude, speed) => {
    const upTime = Math.PI / speed / 4;
    if (time >= upTime) {
      const downTime = 8 - upTime;
      if (time <= downTime)
        return (
          (1 / amplitude + Math.cos((time / downTime) * Math.PI) / amplitude) *
          amplitude *
          amplitude
        );
      else return 0;
    } else
      return (
        (1 / amplitude +
          Math.cos(speed * Math.PI * time - Math.PI) / amplitude) *
        amplitude *
        amplitude
      );
  };
  useFrame((state, delta) => {
    if (!obstacleRef.current) return;

    const time = state.clock.elapsedTime + options.seed;

    let animationTime = 0;
    animationTime += time;
    animationTime %= 10;

    obstacleRef.current.setNextKinematicTranslation({
      x: position[0],
      y:
        position[1] +
        bounceMotion(animationTime, options.amplitude, options.speed) -
        0.1,
      z: position[2],
    });
  });
  return (
    <group position={position} rotation={rotation}>
      <RigidBody
        ref={obstacleRef}
        type='kinematicPosition'
        position={[0, 0, 0]}
        restitution={1}
        friction={1}
        colliders={'cuboid'}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[4, 0.2, 4]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

export default BlockBounce;
