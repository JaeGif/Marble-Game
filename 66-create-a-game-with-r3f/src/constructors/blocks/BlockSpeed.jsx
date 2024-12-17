import React, { useMemo } from 'react';
import * as THREE from 'three';
import { RigidBody, useRapier } from '@react-three/rapier';
import { useGLTF } from '@react-three/drei';
import useGame from '../../stores/useGame';

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const speedMaterial = new THREE.MeshStandardMaterial({ color: 'blue' });

function BlockSpeed({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = { x: 1, y: 1, z: 1 },
}) {
  // when player crosses this block they get a temporary acceleration
  const arrow = useGLTF('./models/arrow.glb');

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
  const arrowClone = useMemo(() => arrow.scene.clone(), []);
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
      <primitive object={arrowClone} scale={0.15} position={[0, 0, 0]} />
    </group>
  );
}

export default BlockSpeed;
