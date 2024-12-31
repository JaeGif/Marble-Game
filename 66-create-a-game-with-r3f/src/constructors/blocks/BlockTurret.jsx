import React, { useRef } from 'react';
import * as THREE from 'three';
import { RigidBody, useRapier } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';

const floor1Material = new THREE.MeshStandardMaterial({ color: 'limegreen' });

const turretMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#6f4e37'),
});

const bulletGeometry = new THREE.SphereGeometry(0.5, 16, 16);
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

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

export default BlockTurret;
