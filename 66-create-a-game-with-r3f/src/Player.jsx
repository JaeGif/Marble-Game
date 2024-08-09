import React, { useEffect, useRef } from 'react';
import { RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';

function Player(props) {
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const bodyRef = useRef();
  const jump = () => {
    bodyRef.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
  };
  useEffect(() => {
    subscribeKeys(
      // listen to just the jump
      // selector
      (state) => state.jump,
      // instructions when selector trips
      (value) => {
        if (value) jump();
      }
    );
  }, []);

  useFrame((state, delta) => {
    // instructions per frame
    const { forward, backward, leftward, rightward } = getKeys();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 1 * delta;
    const torqueStrength = 1 * delta;

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
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial
          map={props.map}
          metalnessMap={props.metalnessMap}
          normalMap={props.normalMap}
          roughnessMap={props.roughnessMap}
          aoMap={props.aoMap}
        />
      </mesh>
    </RigidBody>
  );
}

export default Player;
