import React, { useEffect, useRef, useState } from 'react';
import { RigidBody, useRapier } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';
import useGame from './stores/useGame';

const BALLSIZE = 0.3;

function Player(props) {
  const [subscribeKeys, getKeys] = useKeyboardControls();

  const { rapier, world } = useRapier();

  const [smoothedCameraPosition] = useState(
    () => new THREE.Vector3(10, 10, 10)
  );
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());

  const bodyRef = useRef();

  const start = useGame((state) => state.start);
  const end = useGame((state) => state.end);
  const obstacleCount = useGame((state) => state.obstacleCount);

  const jump = () => {
    const origin = bodyRef.current.translation();
    origin.y -= BALLSIZE + 0.01;

    const direction = { x: 0, y: -1, z: 0 };

    const ray = new rapier.Ray(origin, direction);
    const hit = world.castRay(ray, 10, true);

    if (hit.timeOfImpact < 0.15) {
      // allow for jumping during slight bounce
      bodyRef.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
    }
  };
  useEffect(() => {
    const unsubscribeJump = subscribeKeys(
      // listen to just the jump
      // selector
      (state) => state.jump,
      // instructions when selector trips
      (value) => {
        if (value) jump();
      }
    );
    const unsubscribeAny = subscribeKeys(() => {
      start();
    });
    return () => {
      unsubscribeJump();
      unsubscribeAny();
    };
  }, []);

  useFrame((state, delta) => {
    // instructions per frame

    // Controls
    const { forward, backward, leftward, rightward } = getKeys();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.6 * delta;
    const torqueStrength = 0.2 * delta;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }
    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }
    if (leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }
    if (rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }

    bodyRef.current.applyImpulse(impulse);
    bodyRef.current.applyTorqueImpulse(torque);

    // Camera

    const bodyPosition = bodyRef.current.translation();

    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(bodyPosition);

    cameraPosition.z += 3.25;
    cameraPosition.y += 0.65;

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(bodyPosition);
    cameraTarget.y += 0.25;

    smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
    smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

    state.camera.position.copy(smoothedCameraPosition);
    state.camera.lookAt(smoothedCameraTarget);

    // phases
    if (bodyPosition.z < -(obstacleCount * 4 + 2)) {
      end();
    }
  });

  return (
    <RigidBody
      canSleep={false}
      linearDamping={0.5}
      angularDamping={0.5}
      restitution={0.2}
      friction={1}
      colliders='ball'
      position={[0, 1, 0]}
      ref={bodyRef}
    >
      <mesh castShadow>
        <icosahedronGeometry args={[BALLSIZE, 1]} />
        <meshStandardMaterial
          map={props.map}
          metalnessMap={props.metalnessMap}
          roughnessMap={props.roughnessMap}
          aoMap={props.aoMap}
        />
      </mesh>
    </RigidBody>
  );
}

export default Player;
