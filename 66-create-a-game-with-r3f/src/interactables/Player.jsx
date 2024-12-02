import React, { useEffect, useRef, useState } from 'react';
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

  const start = useGame((state) => state.start);
  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);
  const movementMode = useGame((state) => state.movementMode);
  const gravityDirection = useGame((state) => state.gravityDirection);
  const enablePlayerControls = useGame((state) => state.enablePlayerControls);

  const jump = () => {
    const origin = bodyRef.current.translation();
    const directionDown = { x: 0, y: -1, z: 0 };
    const directionUp = { x: 0, y: 1, z: 0 };
    // Offset origin for the downward ray slightly above the current position
    const downOrigin = { ...origin, y: origin.y - BALLSIZE - 0.01 }; // Offset upwards slightly

    // Offset origin for the upward ray slightly below the current position
    const upOrigin = { ...origin, y: origin.y + BALLSIZE + 0.01 }; // Offset downwards slightly

    const rayUp = new rapier.Ray(upOrigin, directionUp);
    const hitUp = world.castRay(rayUp, 10, true);

    const rayDown = new rapier.Ray(downOrigin, directionDown);
    const hitDown = world.castRay(rayDown, 10, true);

    if (hitDown && hitDown.timeOfImpact < 0.2 && !hitDown.collider.isSensor()) {
      // allow for jumping during slight bounce
      bodyRef.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
    }

    if (hitUp && hitUp.timeOfImpact < 0.2 && !hitUp.collider.isSensor()) {
      // allow for jumping during slight bounce
      bodyRef.current.applyImpulse({ x: 0, y: -0.5, z: 0 });
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
    const unsubscribeGravity = useGame.subscribe(
      (state) => state.gravityDirection,
      (gravityDirection) => {
        bodyRef.current.setGravityScale(gravityDirection);
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
      unsubscribeGravity();
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
    if (enablePlayerControls) {
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
    }
    const bodyPosition = bodyRef.current.translation();

    // out of bounds, restart
    // bounds may need to be adjusted
    if ((bodyPosition.y < -16 || bodyPosition.y > 32) && phase !== 'complete') {
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
      linearDamping={enablePlayerControls ? 0.5 : 0}
      angularDamping={enablePlayerControls ? 0.5 : 0}
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
