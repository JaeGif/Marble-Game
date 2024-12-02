import React, { useRef, useState, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { RigidBody, useRapier, MeshCollider } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import { Float, Text, useGLTF, useTexture } from '@react-three/drei';
import useGame from '../stores/useGame';
import Player from '../interactables/Player';
import uniqid from 'uniqid';
// blocks are 4x4, -z is away from starting cam position
const UNIT_CONSTANT = -4;

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const circleGeometry = new THREE.CircleGeometry(1, 16);
const sphereGeometry = new THREE.SphereGeometry(1, 16, 16);
const bulletGeometry = new THREE.SphereGeometry(0.5, 16, 16);
const squareGeometry = new THREE.BoxGeometry(2, 2, 0);
const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 1, 4, 4, false);
const torusGeometry = new THREE.TorusGeometry(1, 1, 4, 4);
const passThroughBoxGeometry = new THREE.BoxGeometry(
  -UNIT_CONSTANT * 1,
  -UNIT_CONSTANT * 1,
  -UNIT_CONSTANT * 1
);
const passThroughBoxMaterial = new THREE.MeshStandardMaterial({
  color: 'rgb(0, 0, 0)',
  opacity: 0.7,
  transparent: true,
});
const portalMaterial = new THREE.MeshStandardMaterial({
  color: 'rgb(.5, .5,1)',
  transparent: true,
  opacity: 0.4,
});

const floor1Material = new THREE.MeshStandardMaterial({ color: 'limegreen' });
const floor2Material = new THREE.MeshStandardMaterial({ color: 'greenyellow' });
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 'orangered' });
const speedMaterial = new THREE.MeshStandardMaterial({ color: 'blue' });
const negGravMaterial = new THREE.MeshStandardMaterial({ color: 'black' });
const posGravMaterial = new THREE.MeshStandardMaterial({ color: 'orange' });
const flipGravityMaterial = new THREE.MeshStandardMaterial({ color: 'pink' });
const turretMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#6f4e37'),
});

function BlockStart({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  textRotation = [0, -0.25, 0],
}) {
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
          rotation={textRotation}
        >
          Marble Run
          <meshBasicMaterial toneMapped={false} />
        </Text>
      </Float>
    </group>
  );
}

function BlockEnd({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  textRotation = [0, 0, 0],
  options = { textSize: 'l' },
}) {
  const hamburger = useGLTF('./models/hamburger.glb');
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

function BlockSpinner({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = { x: 1, y: 1, z: 1 },
}) {
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
          scale={[3.5 * scale.x, 0.3 * scale.y, 0.3 * scale.z]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

function BlockLimbo({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = { x: 1, y: 1, z: 1 },
}) {
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
          scale={[3.5 * scale.x, 0.3 * scale.y, 0.3 * scale.z]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

function BlockSpeed({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = { x: 1, y: 1, z: 1 },
}) {
  // when player crosses this block they get a temporary acceleration
  const obstacleRef = useRef();
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
  });
  // use position and players position to determine if get benefit
  const speedMultiplier = useGame((state) => state.speedBlockMultiplier);
  const playerHandle = useGame((state) => state.globalPlayerHandle);
  const { world } = useRapier();

  const vector = new THREE.Vector3(0, 0, 1); // Original vector

  // Create individual quaternions for each axis rotation
  const quaternionX = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(1, 0, 0),
    rotation[0]
  ); // Rotate around X
  const quaternionY = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(0, 1, 0),
    rotation[1]
  ); // Rotate around Y
  const quaternionZ = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(0, 0, 1),
    rotation[2]
  ); // Rotate around Z

  // Combine the rotations by multiplying quaternions
  const combinedQuaternion = quaternionX
    .multiply(quaternionY)
    .multiply(quaternionZ);

  // Apply the combined rotation to the vector
  const rotatedVector = vector.clone().applyQuaternion(combinedQuaternion);

  const handleAddingSpeedToPlayer = (collision) => {
    const player = world.getRigidBody(collision.rigidBody.handle);

    if (player.handle.toString() == playerHandle.toString()) {
      //
      player.applyImpulse({
        x: -speedMultiplier * rotatedVector.x,
        y: -speedMultiplier * rotatedVector.y,
        z: -speedMultiplier * rotatedVector.z,
      });
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
          scale={[4 * scale.x, 0.2 * scale.y, 4 * scale.z]}
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
  rotation = [
    [0, 0, 0],
    [0, 0, 0],
  ],
}) {
  const portal1Position = position[0];
  const portal2Position = position[1];
  const portal1Rotation = rotation[0];
  const portal2Rotation = rotation[1];

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
      <group position={portal1Position} rotation={portal1Rotation}>
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
            scale={[1.5 * scale.x, 1.5 * scale.y, 0.3 * scale.z]}
            position={[0, 1.5, 0]}
          />
        </RigidBody>
      </group>
      <group position={portal2Position} rotation={portal2Rotation}>
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
            scale={[1.5 * scale.x, 1.5 * scale.y, 0.3 * scale.z]}
            position={[0, 1.5, 0]}
          />
        </RigidBody>
      </group>
    </>
  );
}
function BlockAxe({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = { x: 1, y: 1, z: 1 },
}) {
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
          scale={[1.5 * scale.x, 1.5 * scale.y, 0.3 * scale.z]}
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
function BlockFloor({
  position,
  rotation = [0, 0, 0],
  scale = { x: 1, y: 1, z: 1 },
  type,
}) {
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
          scale={[4 * scale.x, 0.2 * scale.y, 4 * scale.z]}
          geometry={boxGeometry}
          position={[0, -0.1, 0]}
          material={material}
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

function BlockGravity({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  gravitationalConstant = 1,
  maxDistance = 4,
  type,
}) {
  let material = posGravMaterial;
  if (gravitationalConstant > 0) {
    material = negGravMaterial;
  }

  const sourcePosition = [0, 1, 0];
  // This block exerts force on the player towards it or away from it
  const playerHandle = useGame((state) => state.globalPlayerHandle);
  const { world } = useRapier();

  useFrame((state, delta) => {
    const player = world.getRigidBody(playerHandle);
    if (!player) return;

    const playerPosition = player.translation();

    // Calculate vector from object to source
    const direction = {
      x: sourcePosition[0] + position[0] - playerPosition.x,
      y: sourcePosition[1] * 0.01 + position[1] - playerPosition.y,
      z: sourcePosition[2] + position[2] - playerPosition.z,
    };

    // Calculate distance
    const distance = Math.max(
      1, // Minimum distance to avoid infinite forces
      Math.sqrt(direction.x ** 2 + direction.y ** 2 + direction.z ** 2)
    );

    // Custom decay: Force is zero if beyond maxDistance
    if (distance <= maxDistance) {
      // Rapid decay using quadratic falloff
      const decayFactor = (1 - distance / maxDistance) ** 2;
      const forceMagnitude = (gravitationalConstant * decayFactor) / 20;

      // Normalize direction and calculate force
      const normalizedDirection = {
        x: direction.x / distance,
        y: direction.y / distance,
        z: direction.z / distance,
      };

      // Get current velocity
      const currentVelocity = player.linvel();

      // Increment velocity by scaled force
      let newVelocity = {
        x: currentVelocity.x + normalizedDirection.x * forceMagnitude,
        y: currentVelocity.y + normalizedDirection.y * forceMagnitude,
        z: currentVelocity.z + normalizedDirection.z * forceMagnitude,
      };

      // Clamp velocity to maxVelocity
      const velocityMagnitude = Math.sqrt(
        newVelocity.x ** 2 + newVelocity.y ** 2 + newVelocity.z ** 2
      );
      const maxVelocity = 15;
      if (velocityMagnitude > maxVelocity) {
        const scale = maxVelocity / velocityMagnitude;
        newVelocity = {
          x: newVelocity.x * scale,
          y: newVelocity.y * scale,
          z: newVelocity.z * scale,
        };
      }

      player.setLinvel(newVelocity);
    }
  });
  return (
    <group position={position} rotation={rotation}>
      <Float floatIntensity={2}>
        <mesh
          scale={[0.25, 0.25, 0.25]}
          geometry={sphereGeometry}
          position={sourcePosition}
          material={material}
        />
      </Float>
    </group>
  );
}
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
function BlockTurret({ position, rotation = [0, 0, 0], type }) {
  // shoots random shapes straight
  const direction = new THREE.Vector3(0, 0, 1); // default direction is z
  // some quick maths with quaternions to do the rotation
  const eulerRotation = new THREE.Euler(rotation[0], rotation[1], rotation[2]);
  const quaternion = new THREE.Quaternion().setFromEuler(eulerRotation);
  const rotatedDirection = direction.applyQuaternion(quaternion);
  const normalDirection = rotatedDirection.normalize();
  const rigidBodies = useRef([]);
  const { rapier, world } = useRapier(); // Access the Rapier physics world
  const fireGeometry = (unitDirection, state) => {
    // add the new shape to the scene at 0, 0, 0
    // scale the shape quickly up to full
    // give it some force in the unitDirection, with some slight randomness in x, y, z
    console.log('fire:', unitDirection);
    const bullet = new THREE.Mesh(bulletGeometry, floor1Material);
    bullet.position.set(position[0], position[1], position[2]);
    state.scene.add(bullet);
    const rigidBodyDesc = rapier.RigidBodyDesc.dynamic().setTranslation(
      0,
      4,
      0
    );
    const rigidBody = world.createRigidBody(rigidBodyDesc);

    const colliderDesc = rapier.ColliderDesc.ball(0.5);

    world.createCollider(colliderDesc, rigidBody);
  };

  const timer = useRef(0);
  useFrame((state, delta) => {
    // generate a random geometry every 2s
    timer.current += delta;

    if (timer.current >= 2) {
      timer.current = 0;

      fireGeometry(normalDirection, state);
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <RigidBody type='fixed' colliders={'hull'}>
        <mesh
          scale={[0.5, 0.5, 1]}
          geometry={boxGeometry}
          material={turretMaterial}
          position={[0, 1, 0]}
          receiveShadow
        />
        <mesh
          scale={[0.55, 0.1, 1.1]}
          geometry={boxGeometry}
          material={turretMaterial}
          position={[0, 0.75, 0]}
          receiveShadow
        />
        <mesh
          scale={[0.2, 0.2, 0.5]}
          geometry={boxGeometry}
          material={turretMaterial}
          position={[0, 1, 0.5]}
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

function BlockPassThrough({
  position,
  rotation = [0, 0, 0],
  scale = { x: 1, y: 1, z: 1 },
  type,
}) {
  // When player passes through this block, their velocity remains constant, unaffected by gravity
  //    until they pass through the other side
  //    effectively, the player continues in a set direction and can only go one way
  //    through this block
  const player = useRef(null);
  const gravityDirection = useGame((state) => state.gravityDirection);
  const { world } = useRapier();
  const setEnablePlayerControls = useGame(
    (state) => state.setEnablePlayerControls
  );
  const handlePassThrough = (collision) => {
    // get current player velocity and update ref
    player.current = world.getRigidBody(collision.rigidBody.handle);
    // disable gravity so only linvel/angvel effects carry through
    player.current.setGravityScale(0);
    setEnablePlayerControls(false);
  };
  const handleExitMaterial = (collision) => {
    // re-enable gravity as it was before
    player.current.setGravityScale(gravityDirection);
    // flip switch allowing state to be changed

    setEnablePlayerControls(true);
  };

  return (
    <group position={position} rotation={rotation}>
      <RigidBody
        friction={0}
        restitution={0}
        type='kinematicPosition'
        sensor
        onIntersectionEnter={handlePassThrough}
        onIntersectionExit={handleExitMaterial}
      >
        <mesh
          scale={[scale.x, scale.y, scale.z]}
          geometry={passThroughBoxGeometry}
          material={passThroughBoxMaterial}
          position={[0, 0, 0]}
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
  gravitationalConstant,
  maxDistance,
  textRotation,
  scale = { x: 1, y: 1, z: 1 },
  options = { floor: 'floor' },
}) {
  // position offset so it aligns flush when upside down
  if (Math.round(rotation[0]) === Math.round(Math.PI)) {
    position[1] += 0.05;
  }
  if (Math.round(rotation[2]) === Math.round(Math.PI)) {
    position[1] += 0.05;
  }

  const blockMap = {
    floor: BlockFloor,
    limbo: BlockLimbo,
    axe: BlockAxe,
    blueHealth: BlockBlueHealth,
    speed: BlockSpeed,
    spinner: BlockSpinner,
    portal: BlockPortal,
    bounce: BlockBounce,
    gravity: BlockGravity,
    flipGravity: BlockFlipGravity,
    roundabout: BlockRoundAbout,
    turret: BlockTurret,
    passThrough: BlockPassThrough,
    start: BlockStart,
    end: BlockEnd,
  };
  const floorOptions = {
    floor: BlockFloor,
    speed: BlockSpeed,
    bounce: BlockBounce,
    none: null,
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
          scale={scale}
          rotation={rotation}
        />
      ) : type === 'speed' ||
        type === 'bounce' ||
        type === 'flipGravity' ||
        type === 'roundabout' ||
        type === 'turret' ||
        type === 'passThrough' ? (
        <>
          <Block
            position={[
              position[0] * UNIT_CONSTANT,
              position[1] * UNIT_CONSTANT,
              position[2] * UNIT_CONSTANT,
            ]}
            rotation={rotation}
            options={options}
            scale={scale}
            gravitationalConstant={gravitationalConstant}
            maxDistance={maxDistance}
            textRotation={textRotation}
          />
        </>
      ) : type === 'portal' ? (
        <>
          {options.floor === 'none' ? (
            <></>
          ) : (
            <>
              <Floor
                position={[
                  position[0][0] * UNIT_CONSTANT,
                  position[0][1] * UNIT_CONSTANT,
                  position[0][2] * UNIT_CONSTANT,
                ]}
                scale={scale}
                rotation={[rotation[0][0], rotation[0][1], rotation[0][2]]}
                type={type}
              />
              <Floor
                position={[
                  position[1][0] * UNIT_CONSTANT,
                  position[1][1] * UNIT_CONSTANT,
                  position[1][2] * UNIT_CONSTANT,
                ]}
                scale={scale}
                rotation={[rotation[1][0], rotation[1][1], rotation[1][2]]}
                type={type}
              />
            </>
          )}
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
            rotation={[
              [rotation[0][0], rotation[0][1], rotation[0][2]],
              [rotation[1][0], rotation[1][1], rotation[1][2]],
            ]}
            textRotation={textRotation}
            scale={scale}
          />
        </>
      ) : (
        <>
          {options.floor === 'none' ? (
            <></>
          ) : (
            <Floor
              position={[
                position[0] * UNIT_CONSTANT,
                position[1] * UNIT_CONSTANT,
                position[2] * UNIT_CONSTANT,
              ]}
              scale={scale}
              rotation={rotation}
              type={type}
            />
          )}
          <Block
            options={options}
            position={[
              position[0] * UNIT_CONSTANT,
              position[1] * UNIT_CONSTANT,
              position[2] * UNIT_CONSTANT,
            ]}
            gravitationalConstant={gravitationalConstant}
            maxDistance={maxDistance}
            rotation={rotation}
            textRotation={textRotation}
            scale={scale}
          />
        </>
      )}
    </>
  );
}
