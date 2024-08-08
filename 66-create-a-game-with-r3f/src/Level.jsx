import React, { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import { Float, useGLTF } from '@react-three/drei';

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floor1Material = new THREE.MeshStandardMaterial({ color: 'limegreen' });
const floor2Material = new THREE.MeshStandardMaterial({ color: 'greenyellow' });
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 'orangered' });
const wallMaterial = new THREE.MeshStandardMaterial({ color: 'slategrey' });

export function BlockStart({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <mesh
        scale={[4, 0.1, 4]}
        geometry={boxGeometry}
        material={floor1Material}
        position={[0, -0.1, 0]}
        receiveShadow
      />
    </group>
  );
}

export function BlockEnd({ position = [0, 0, 0] }) {
  const hamburger = useGLTF('./hamburger.glb');
  // hamburger shadows
  hamburger.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });
  const goalRef = useRef();

  useFrame((state) => {
    goalRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
  });
  return (
    <group position={position}>
      <mesh
        scale={[4, 0.3, 4]}
        geometry={boxGeometry}
        material={floor1Material}
        position={[0, 0, 0]}
        receiveShadow
      />
      <Float rotationIntensity={0.5}>
        <group ref={goalRef}>
          <RigidBody
            type='fixed'
            colliders='hull'
            position={[0, 0.25, 0]}
            restitution={0.2}
            friction={0}
          >
            <primitive object={hamburger.scene} scale={0.2} />
          </RigidBody>
        </group>
      </Float>
    </group>
  );
}

export function BlockSpinner({ position = [0, 0, 0] }) {
  const [speed] = useState(
    () => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1)
  );

  const obstacleRef = useRef();
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const rotation = new THREE.Quaternion();
    rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));
    obstacleRef.current.setNextKinematicRotation(rotation);
  });

  return (
    <group position={position}>
      <mesh
        scale={[4, 0.2, 4]}
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        receiveShadow
      />
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
          scale={[3.5, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

export function BlockLimbo({ position = [0, 0, 0] }) {
  const [speed] = useState(
    () => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1)
  );
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  const obstacleRef = useRef();
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const y = Math.sin(time + timeOffset) + 1.15;
    obstacleRef.current.setNextKinematicTranslation({
      x: position[0],
      y: position[1] + y,
      z: position[2],
    });
  });

  return (
    <group position={position}>
      <mesh
        scale={[4, 0.2, 4]}
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        receiveShadow
      />
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
          scale={[3.5, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

export function BlockAxe({ position = [0, 0, 0] }) {
  const [speed] = useState(
    () => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1)
  );
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  const obstacleRef = useRef();
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const x = Math.sin(time + timeOffset) * 1.25;
    obstacleRef.current.setNextKinematicTranslation({
      x: position[0] + x,
      y: position[1] + 0.75,
      z: position[2],
    });
  });

  return (
    <group position={position}>
      <mesh
        scale={[4, 0.2, 4]}
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        receiveShadow
      />
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
          scale={[1.5, 1.5, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

function Level({
  obstacleCount = 5,
  types = [BlockSpinner, BlockAxe, BlockLimbo],
}) {
  // useMemo to generate the array only once
  const blocks = useMemo(() => {
    // scoped out :)
    const blocks = [];
    const OFFSET = 0.0001;
    for (let i = 0; i < obstacleCount; i++) {
      const type = types[Math.floor(Math.random() * types.length - OFFSET)];
      blocks.push(type);
    }
    return blocks;
  }, [obstacleCount, types]);
  return (
    <>
      <BlockStart position={[0, 0, 0]} />
    </>
  );
}

export default Level;
