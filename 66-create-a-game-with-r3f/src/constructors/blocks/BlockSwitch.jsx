import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';

const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 1, 16, 1, false);
const floor1Material = new THREE.MeshStandardMaterial({ color: 'limegreen' });
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

function BlockSwitch({
  position = [
    [0, 0, 1],
    [0, -0.5, 1.5],
  ],
  rotation = [
    [0, 0, 0],
    [Math.PI / 2, 0, 0],
  ],
  scale = { x: 1, y: 1, z: 1 },
  options = { endGatePosition: [0, -1, 0] },
  type,
}) {
  let switchPosition = position[0];
  let gatePosition = position[1];
  let switchRotation = rotation[0];
  let gateRotation = rotation[1];

  const [isPressed, setIsPressed] = useState(false);
  const gateRef = useRef(null);
  const switchRef = useRef(null);

  const handleSwitchPress = () => {
    // animate switch down
    // animate gate open direction from opts
    setIsPressed(true);
  };

  const gateOpen = (animationTime, delta) => {
    animationTime.current = Math.min(
      animationTime.current + delta / animationDuration,
      1
    );
    // interpolate position
    const newPosition = startPosition.current.map(
      (start, i) =>
        start +
        animationTime.current * (endPosition.current[i] * UNIT_CONSTANT - start)
    );
    gateRef.current.setNextKinematicTranslation({
      x: newPosition[0],
      y: newPosition[1],
      z: newPosition[2],
    });
    return newPosition;
  };
  const switchDirections = (animationTime, newPosition) => {
    // If switch is toggled again, gate will go the other way
    setIsPressed(false);

    // finally reset the gate Direction
    endPosition.current = [
      startPosition.current[0] / UNIT_CONSTANT,
      startPosition.current[1] / UNIT_CONSTANT,
      startPosition.current[2] / UNIT_CONSTANT,
    ];
    startPosition.current = newPosition;

    switchEndPosition.current = switchStartPosition.current;
    switchStartPosition.current = newPosition;

    animationTime.current = 0;
  };
  const switchDown = (animationTime, delta) => {
    animationTime.current = Math.min(
      animationTime.current + delta / animationDuration,
      1
    );
    // interpolate position
    const newPosition = switchStartPosition.current.map(
      (start, i) =>
        start + animationTime.current * (switchEndPosition.current[i] - start)
    );
    switchRef.current.setNextKinematicTranslation({
      x: newPosition[0],
      y: newPosition[1],
      z: newPosition[2],
    });
    return newPosition;
  };
  const SWITCH_OFFSET = 0.1;
  const animationTime = useRef(0);
  const animationDuration = 2;
  const startPosition = useRef(gatePosition);
  const endPosition = useRef(options.endGatePosition);
  const switchStartPosition = useRef(switchPosition);
  let switcheroo = -SWITCH_OFFSET * 4;
  if (
    rotation &&
    (Math.round(switchRotation[0]) || Math.round(switchRotation[2])) ===
      Math.round(Math.PI)
  ) {
    switcheroo = SWITCH_OFFSET * 4;
  }

  const switchEndPosition = useRef([
    switchPosition[0],
    switchPosition[1] + switcheroo,
    switchPosition[2],
  ]);
  let newGatePosition = useRef();
  let newSwitchPosition = useRef();

  useFrame((state, delta) => {
    if (isPressed && switchRef.current && gateRef.current) {
      if (animationTime.current !== 1) {
        newGatePosition.current = gateOpen(animationTime, delta);
        newSwitchPosition.current = switchDown(animationTime, delta);
        console.log(newGatePosition);
      } else {
        switchDirections(
          animationTime,
          newGatePosition.current,
          newSwitchPosition.current
        );
      }
    }
  });

  return (
    <>
      <group position={switchPosition} rotation={switchRotation}>
        <RigidBody
          ref={switchRef}
          onCollisionEnter={handleSwitchPress}
          type='kinematicPosition'
          colliders='hull'
          restitution={0.2}
          friction={0}
        >
          <mesh
            scale={[1 * scale.x, 0.2 * scale.y, 1 * scale.z]}
            geometry={cylinderGeometry}
            position={[0, SWITCH_OFFSET, 0]}
            material={floor1Material}
            receiveShadow
          />
        </RigidBody>
      </group>
      <group position={gatePosition} rotation={gateRotation}>
        <RigidBody
          ref={gateRef}
          type='kinematicPosition'
          colliders='cuboid'
          restitution={0.2}
          friction={0}
        >
          <mesh
            scale={[4 * scale.x, 0.2 * scale.y, 4 * scale.z]}
            geometry={boxGeometry}
            position={[0, -0.1, 0]}
            material={floor1Material}
            receiveShadow
          />
        </RigidBody>
      </group>
    </>
  );
}

export default BlockSwitch;
