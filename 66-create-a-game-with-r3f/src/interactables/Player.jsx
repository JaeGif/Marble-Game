import React, { useEffect, useRef } from 'react';
import { RigidBody, useRapier } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import useGame from '../stores/useGame';
import { playerActionsLogicTree } from './playerActions';

const BALLSIZE = 0.3;

function Player({ textures, parentPosition, position }) {
  const [subscribeKeys, getKeys] = useKeyboardControls();

  const { rapier, world } = useRapier();

  const bodyRef = useRef();

  const setGlobalPlayerHandle = useGame((state) => state.setGlobalPlayerHandle);
  const globalPlayerHandle = useGame((state) => state.globalPlayerHandle);
  const gravityDirection = useGame((state) => state.gravityDirection);

  const start = useGame((state) => state.start);
  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);
  const movementMode = useGame((state) => state.movementMode);

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

  const reset = () => {
    // when phase changes to ready we need to reset
    bodyRef.current.setTranslation({
      x: parentPosition[0],
      y: parentPosition[1] + position[1],
      z: parentPosition[2],
    });
    bodyRef.current.setLinvel({ x: 0, y: 0, z: 0 });
    bodyRef.current.setAngvel({ x: 0, y: 0, z: 0 });
  };
  useEffect(() => {
    const unsubscribeReset = useGame.subscribe(
      (state) => state.phase,
      (phase) => {
        if (phase === 'ready') {
          reset();
        }
      }
    );
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

    const unsubscribePlayerHandle = useGame.subscribe(
      (state) => state.globalPlayerHandle
    );

    return () => {
      unsubscribeJump();
      unsubscribeAny();
      unsubscribeReset();
      unsubscribePlayerHandle();
    };
  }, []);

  useFrame((state, delta) => {
    // instructions per frame
    // Controls
    if (!bodyRef.current) return;
    const { forward, backward, leftward, rightward } = getKeys();

    // Player Actions
    playerActionsLogicTree(
      bodyRef,
      delta,
      state,
      gravityDirection,
      movementMode,
      forward,
      backward,
      leftward,
      rightward
    );
    const bodyPosition = bodyRef.current.translation();

    // out of bounds, restart
    // bounds may need to be adjusted
    if (bodyPosition.y < -16 && phase !== 'complete') {
      restart();
    }
  });

  useEffect(() => {
    // set handle to state management
    if (bodyRef.current && globalPlayerHandle !== bodyRef.current.handle) {
      setGlobalPlayerHandle(bodyRef.current.handle);
    }
  }, [bodyRef.current]);

  return (
    <RigidBody
      canSleep={false}
      linearDamping={0.5}
      angularDamping={0.5}
      restitution={0.2}
      friction={1}
      colliders='ball'
      position={position}
      ref={bodyRef}
      name='player'
    >
      <mesh castShadow receiveShadow>
        <icosahedronGeometry args={[BALLSIZE, 4]} />
        <meshStandardMaterial
          map={textures.map}
          metalnessMap={textures.metalnessMap}
          roughnessMap={textures.roughnessMap}
          aoMap={textures.aoMap}
        />
      </mesh>
    </RigidBody>
  );
}

export default Player;
