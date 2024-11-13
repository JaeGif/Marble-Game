import React, { useRef, useState, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import {
  RigidBody,
  useRapier,
  MeshCollider,
  CuboidCollider,
} from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import { Float, Text, useGLTF, useTexture } from '@react-three/drei';
import useGame from '../stores/useGame';
import Player from '../interactables/Player';
// blocks are 4x4, -z is away from starting cam position
const UNIT_CONSTANT = -4;

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const circleGeometry = new THREE.CircleGeometry(1, 16);

const squareGeometry = new THREE.BoxGeometry(2, 2, 0);

const portalMaterial = new THREE.MeshStandardMaterial({
  color: 'rgba(.5, .5, .5, .1)',
  transparent: true,
});

const floor1Material = new THREE.MeshStandardMaterial({ color: 'limegreen' });
const floor2Material = new THREE.MeshStandardMaterial({ color: 'greenyellow' });
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 'orangered' });
const speedMaterial = new THREE.MeshStandardMaterial({ color: 'blue' });

function BlockStart({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const textures = useTexture({
    map: './textures/Poliigon_WoodVeneerOak_7760/1K/Poliigon_WoodVeneerOak_7760_BaseColor.jpg',
    roughnessMap:
      './textures/Poliigon_WoodVeneerOak_7760/1K/Poliigon_WoodVeneerOak_7760_ORM.jpg',
    metalnessMap:
      './textures/Poliigon_WoodVeneerOak_7760/1K/Poliigon_WoodVeneerOak_7760_ORM.jpg',
    aoMap:
      './textures/Poliigon_WoodVeneerOak_7760/1K/Poliigon_WoodVeneerOak_7760_ORM.jpg',
  });

  return (
    <group position={position} rotation={rotation}>
      <Player
        textures={textures}
        parentPosition={position}
        position={[0, 1.5, 0]}
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

function BlockEnd({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const hamburger = useGLTF('./hamburger.glb');
  // hamburger shadows
  hamburger.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });
  const goalRef = useRef();
  const end = useGame((state) => state.end);

  useFrame((state) => {
    if (!goalRef.current) return;

    goalRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
  });
  const handleCollisionEnter = () => {
    end();
  };
  return (
    <group position={position} rotation={rotation}>
      <Text
        font='./bebas-neue-v9-latin-regular.woff'
        scale={5}
        position={[0, 3, 2]}
      >
        FINISH
        <meshBasicMaterial toneMapped={false} />
      </Text>
      <Float rotationIntensity={0.5}>
        <group ref={goalRef}>
          <RigidBody
            onCollisionEnter={handleCollisionEnter}
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

function BlockSpinner({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
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
          scale={[3.5, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

function BlockLimbo({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
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
          scale={[3.5, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

function BlockSpeed({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
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

    if (player.handle.toString() == playerHandle.toString()) {
      player.applyImpulse({ x: 0, y: 0, z: -speedMultiplier });
    }
  };
  return (
    <group position={position} rotation={rotation}>
      <RigidBody
        type='fixed'
        onCollisionEnter={handleAddingSpeedToPlayer}
        onIntersectionEnter={handleAddingSpeedToPlayer}
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

function BlockPortal({
  position = [
    [0, 0, 0],
    [0, 0, 1],
  ],
  rotation = [0, 0, 0],
}) {
  const portal1Position = position[0];
  const portal2Position = position[1];
  // when player crosses this block they are teleported between the portals locations.

  // if on cooldown, may not transport
  const [onCooldown, setOnCooldown] = useState(false);

  // use position and players position to determine if get benefit
  const playerHandle = useGame((state) => state.globalPlayerHandle);
  const { world } = useRapier();
  const handleCooldownTrigger = () => {
    // 5 sec cooldown
    setOnCooldown(true);
    setTimeout(() => setOnCooldown(false), 5000);
  };
  const handleUpdatePlayerLocation = (collision, position) => {
    if (onCooldown) return;

    const player = world.getRigidBody(collision.rigidBody.handle);
    if (player.handle.toString() == playerHandle.toString()) {
      // interact with player positions
      const playerLoc = {
        x: position[0],
        y: position[1] + 0.25,
        z: position[2],
      };
      player.setTranslation(playerLoc);

      handleCooldownTrigger();
    }
  };
  return (
    <>
      <group position={portal1Position} rotation={rotation}>
        <RigidBody
          type='fixed'
          sensor
          onIntersectionEnter={(collision) =>
            handleUpdatePlayerLocation(collision, portal2Position)
          }
        >
          <mesh
            geometry={squareGeometry}
            material={portalMaterial}
            scale={[1.5, 1.5, 0.3]}
            position={[0, 1.5, 0]}
          />
        </RigidBody>
      </group>
      <group position={portal2Position} rotation={rotation}>
        <RigidBody
          type='fixed'
          sensor
          onIntersectionEnter={(collision) =>
            handleUpdatePlayerLocation(collision, portal1Position)
          }
        >
          <mesh
            geometry={squareGeometry}
            material={portalMaterial}
            scale={[1.5, 1.5, 0.3]}
            position={[0, 1.5, 0]}
          />
        </RigidBody>
      </group>
    </>
  );
}
function BlockAxe({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
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
          scale={[1.5, 1.5, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}
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
function BlockBlueHealth({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
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
    <group position={position} rotation={rotation}>
      {isUncollected && (
        <RigidBody
          type='kinematicPosition'
          ref={healthRef}
          onCollisionEnter={handleCollisionEnter}
          position={[0, 0.5, 0]}
        >
          <MeshCollider
            args={[2, 1, 2]}
            //   args={[nodes.YourMesh.geometry]} // Use geometry from the GLTF model
            sensor
          >
            <mesh>
              <boxGeometry args={[2, 1, 2]} />
              <meshStandardMaterial color='blue' opacity={0.3} transparent />
            </mesh>
          </MeshCollider>
        </RigidBody>
      )}
    </group>
  );
}
// platform types are block types
function BlockFloor({ position, rotation = [0, 0, 0], type }) {
  let material = floor2Material;
  switch (type) {
    case 'start':
      material = floor1Material;
      break;
    case 'end':
      material = floor1Material;
      break;

    default:
      material = floor2Material;
  }
  return (
    <group position={position} rotation={rotation}>
      <RigidBody type='fixed' colliders='cuboid' restitution={0.2} friction={0}>
        <mesh
          scale={[4, 0.2, 4]}
          geometry={boxGeometry}
          position={[0, -0.1, 0]}
          material={material}
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

/**
 * Represents a Platform of specified type and position.
 * @param {string} 'start' | 'end' | 'spinner' | 'axe' | 'limbo' | 'blueHealth' | 'speed' | 'portal' | 'bounce' | 'floor'
 * @param {[number, number, number]} position [x, y, z] world coordinates
 */
export function Platform({
  type,
  position,
  rotation = [0, 0, 0],
  options = { floor: 'floor' },
}) {
  const blockMap = {
    floor: BlockFloor,
    limbo: BlockLimbo,
    axe: BlockAxe,
    blueHealth: BlockBlueHealth,
    speed: BlockSpeed,
    spinner: BlockSpinner,
    portal: BlockPortal,
    bounce: BlockBounce,
    start: BlockStart,
    end: BlockEnd,
  };
  const floorOptions = {
    floor: BlockFloor,
    speed: BlockSpeed,
    bounce: BlockBounce,
  };
  const Floor = floorOptions[options.floor];

  const Block = blockMap[type];

  return (
    <>
      {type === 'floor' ? (
        <BlockFloor
          position={[
            position[0] * UNIT_CONSTANT,
            position[1] * UNIT_CONSTANT,
            position[2] * UNIT_CONSTANT,
          ]}
          type={type}
          rotation={rotation}
        />
      ) : type === 'speed' || type === 'bounce' ? (
        <>
          <Block
            position={[
              position[0] * UNIT_CONSTANT,
              position[1] * UNIT_CONSTANT,
              position[2] * UNIT_CONSTANT,
            ]}
            rotation={rotation}
            options={options}
          />
        </>
      ) : type === 'portal' ? (
        <>
          <BlockFloor
            position={[
              position[0][0] * UNIT_CONSTANT,
              position[0][1] * UNIT_CONSTANT,
              position[0][2] * UNIT_CONSTANT,
            ]}
            rotation={rotation}
            type={type}
          />
          <BlockFloor
            position={[
              position[1][0] * UNIT_CONSTANT,
              position[1][1] * UNIT_CONSTANT,
              position[1][2] * UNIT_CONSTANT,
            ]}
            rotation={rotation}
            type={type}
          />
          <Block
            options={options}
            position={[
              [
                position[0][0] * UNIT_CONSTANT,
                position[0][1] * UNIT_CONSTANT,
                position[0][2] * UNIT_CONSTANT,
              ],
              [
                position[1][0] * UNIT_CONSTANT,
                position[1][1] * UNIT_CONSTANT,
                position[1][2] * UNIT_CONSTANT,
              ],
            ]}
            rotation={rotation}
          />
        </>
      ) : (
        <>
          <Floor
            position={[
              position[0] * UNIT_CONSTANT,
              position[1] * UNIT_CONSTANT,
              position[2] * UNIT_CONSTANT,
            ]}
            rotation={rotation}
            type={type}
          />
          <Block
            options={options}
            position={[
              position[0] * UNIT_CONSTANT,
              position[1] * UNIT_CONSTANT,
              position[2] * UNIT_CONSTANT,
            ]}
            rotation={rotation}
          />
        </>
      )}
    </>
  );
}
