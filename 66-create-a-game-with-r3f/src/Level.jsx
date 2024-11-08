import React, { useRef, useState, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import {
  RigidBody,
  CuboidCollider,
  useRapier,
  MeshCollider,
} from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import { Float, Text, useGLTF } from '@react-three/drei';
import useGame from './stores/useGame';

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floor1Material = new THREE.MeshStandardMaterial({ color: 'limegreen' });
const floor2Material = new THREE.MeshStandardMaterial({ color: 'greenyellow' });
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 'orangered' });
const speedMaterial = new THREE.MeshStandardMaterial({ color: 'blue' });

const wallMaterial = new THREE.MeshStandardMaterial({ color: 'slategrey' });

export function BlockStart({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <mesh
        scale={[4, 0.2, 4]}
        geometry={boxGeometry}
        material={floor1Material}
        position={[0, -0.1, 0]}
        receiveShadow
      />
      <Float floatIntensity={0.25} rotationIntensity={0.25}>
        <Text
          font='./bebas-neue-v9-latin-regular.woff'
          scale={0.5}
          maxWidth={0.25}
          lineHeight={0.75}
          textAlign='right'
          position={[0.75, 0.65, 0]}
          rotation-y={-0.25}
        >
          Marble Run
          <meshBasicMaterial toneMapped={false} />
        </Text>
      </Float>
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
    if (!goalRef.current) return;

    goalRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
  });
  return (
    <group position={position}>
      <Text
        font='./bebas-neue-v9-latin-regular.woff'
        scale={5}
        position={[0, 3, 2]}
      >
        FINISH
        <meshBasicMaterial toneMapped={false} />
      </Text>
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
    if (!obstacleRef.current) return;

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
    if (!obstacleRef.current) return;

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

export function BlockSpeed({ position = [0, 0, 0] }) {
  // when player crosses this block they get a temporary acceleration
  const obstacleRef = useRef();
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
  });
  // use position and players position to determine if get benefit
  const speedMultiplier = useGame((state) => state.speedBlockMultiplier);
  const playerHandle = useGame((state) => state.globalPlayerHandle);
  const { world } = useRapier();
  const handleAddingSpeedToPlayer = (collision) => {
    const player = world.getRigidBody(collision.rigidBody.handle);
    console.log(collision, playerHandle);

    if (player.handle.toString() == playerHandle.toString()) {
      player.applyImpulse({ x: 0, y: 0, z: -speedMultiplier });
      console.log('match');
    }
  };
  return (
    <group position={position}>
      <RigidBody
        onCollisionEnter={handleAddingSpeedToPlayer}
        colliders={'cuboid'}
      >
        <mesh
          scale={[4, 0.2, 4]}
          geometry={boxGeometry}
          material={speedMaterial}
          position={[0, -0.1, 0]}
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
    if (!obstacleRef.current) return;

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
export function BlockBlueHealth({ position = [0, 0, 0] }) {
  /*   const [speed] = useState(
    () => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1)
  );
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);
 */

  const [isUncollected, setIsUncollected] = useState(true);

  const healthRef = useRef();
  const adjustLives = useGame((state) => state.adjustLives);
  const adjustScore = useGame((state) => state.adjustScore);
  const handleCollisionEnter = (foreignCollider) => {
    // up hearts and score
    adjustLives(1);
    adjustScore(1000);
    setIsUncollected(false);
  };

  return (
    <group position={position}>
      <mesh
        scale={[4, 0.2, 4]}
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        receiveShadow
      />
      {isUncollected && (
        <RigidBody
          type='kinematicPosition'
          ref={healthRef}
          onCollisionEnter={handleCollisionEnter}
        >
          <MeshCollider
            args={[2, 2, 2]}
            //   args={[nodes.YourMesh.geometry]} // Use geometry from the GLTF model
            sensor
          >
            <mesh>
              <boxGeometry args={[2, 2, 2]} />
              <meshStandardMaterial color='blue' opacity={0.3} transparent />
            </mesh>
          </MeshCollider>
        </RigidBody>
      )}
    </group>
  );
}
function Bounds({ length = 1 }) {
  return (
    <>
      <RigidBody type='fixed' restitution={0.2} friction={0}>
        {/* // remove walls way more fun */}
        {/*        <mesh
          position={[2.15, 0.75, -(length * 2) + 2]}
          scale={[0.3, 1.5, 4 * length]}
          geometry={boxGeometry}
          material={wallMaterial}
          castShadow
        />
        <mesh
          position={[-2.15, 0.75, -(length * 2) + 2]}
          scale={[0.3, 1.5, 4 * length]}
          geometry={boxGeometry}
          material={wallMaterial}
          receiveShadow
        />
        <mesh
          position={[0, 0.75, -(length * 4) + 2]}
          scale={[4, 1.5, 0.3]}
          geometry={boxGeometry}
          material={wallMaterial}
          castShadow
        /> */}
        <CuboidCollider
          restitution={0.2}
          friction={1}
          // friction so the ball can roll
          args={[2, 0.1, 2 * length]}
          position={[0, -0.1, -(length * 2) + 2]}
        />
      </RigidBody>
    </>
  );
}

function Level({
  obstacleCount = 5,
  types = [BlockSpinner, BlockAxe, BlockLimbo, BlockSpeed, BlockBlueHealth],
  level = 1,
}) {
  const levelObstacles = obstacleCount + level * 2;

  const blocks = useMemo(() => {
    // scoped out :)
    const blocks = [];
    const OFFSET = 0.0001;

    for (let i = 0; i < levelObstacles; i++) {
      const type = types[Math.floor(Math.random() * types.length - OFFSET)];
      blocks.push(type);
    }
    return blocks;
  }, [obstacleCount, types, level]);

  return (
    <>
      <BlockStart position={[0, 0, 0]} />
      {blocks.map((Block, i) => (
        <Block key={i} position={[0, 0, -(i + 1) * 4]} />
      ))}
      <BlockEnd position={[0, 0, -(levelObstacles + 1) * 4]} />

      <Bounds length={levelObstacles + 2} />
    </>
  );
}

export default Level;
