import React, { useRef } from 'react';
import * as THREE from 'three';
import { RigidBody } from '@react-three/rapier';
import { shaderMaterial } from '@react-three/drei';
import { useFrame, extend } from '@react-three/fiber';

import useGame from '../../stores/useGame';

import vertexShader from '../shaders/flipGravity/vertex.glsl';
import fragmentShader from '../shaders/flipGravity/fragment.glsl';

import ribbonVertexShader from '../shaders/flipGravity/ribbonVertex.glsl';
import ribbonFragmentShader from '../shaders/flipGravity/ribbonFragment.glsl';

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const squareGeometry = new THREE.BoxGeometry(1, 1);

const FlipGravityShaderMaterial = shaderMaterial(
  {
    uTime: 0,
  },
  vertexShader,
  fragmentShader
);
const FlipGravityRibbonShaderMaterial = shaderMaterial(
  {
    uTime: 0,
  },
  ribbonVertexShader,
  ribbonFragmentShader
);
extend({ FlipGravityShaderMaterial });
extend({ FlipGravityRibbonShaderMaterial });

function BlockFlipGravity({ position, rotation = [0, 0, 0], type }) {
  // when player crosses this block, gravity is inverted
  const flipGravityShaderRef = useRef();
  const ribbonRefOne = useRef();
  const ribbonRefTwo = useRef();
  const ribbonRefThree = useRef();
  const ribbonRefFour = useRef();

  const gravityDirection = useGame((state) => state.gravityDirection);
  const setGravityDirection = useGame((state) => state.setGravityDirection);

  const handleGravityFlip = () => {
    const flipped = gravityDirection === -1 ? 1 : -1;
    setGravityDirection(flipped);
  };

  useFrame((state, delta) => {
    flipGravityShaderRef.current.uniforms.uTime.value += delta;
  });
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
          position={[0, -0.1, 0]}
        >
          <flipGravityShaderMaterial ref={flipGravityShaderRef} />
        </mesh>
      </RigidBody>
      <mesh
        scale={[0.75, 0, 4]}
        geometry={squareGeometry}
        position={[2, 0.35, 0]}
        rotation={[0, 0, Math.PI / 2]}
        receiveShadow
      >
        <flipGravityRibbonShaderMaterial ref={ribbonRefOne} />
      </mesh>
      <mesh
        scale={[0.75, 0, 4]}
        geometry={squareGeometry}
        position={[-2, 0.35, 0]}
        rotation={[0, 0, Math.PI / 2]}
        receiveShadow
      >
        <flipGravityRibbonShaderMaterial ref={ribbonRefTwo} />
      </mesh>
      <mesh
        scale={[0.75, 0, 4]}
        geometry={squareGeometry}
        position={[0, 0.35, 2]}
        rotation={[0, Math.PI / 2, Math.PI / 2]}
        receiveShadow
      >
        <flipGravityRibbonShaderMaterial ref={ribbonRefThree} />
      </mesh>
      <mesh
        scale={[0.75, 0, 4]}
        geometry={squareGeometry}
        position={[0, 0.35, -2]}
        rotation={[0, Math.PI / 2, Math.PI / 2]}
        receiveShadow
      >
        <flipGravityRibbonShaderMaterial ref={ribbonRefThree} />
      </mesh>
    </group>
  );
}

export default BlockFlipGravity;
