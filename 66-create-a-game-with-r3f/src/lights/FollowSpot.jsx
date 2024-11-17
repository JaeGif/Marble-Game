import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useRapier } from '@react-three/rapier';
import useGame from '../stores/useGame';
import * as THREE from 'three';

export default function FollowSpot() {
  const spotLight = useRef();

  const { world } = useRapier();

  const globalPlayerHandle = useGame((state) => state.globalPlayerHandle);

  useFrame((state, delta) => {
    const player = world.getRigidBody(globalPlayerHandle);
    if (!state.camera) return;

    if (!player) return;
    const playerPosition = player.translation();
    spotLight.current.position.x = state.camera.position.x;
    spotLight.current.position.y = playerPosition.y + 1;
    spotLight.current.position.z = state.camera.position.z + 0.1;

    const cameraVecsUnder = new THREE.Vector3(
      state.camera.position.x,
      0,
      state.camera.position.z
    );

    spotLight.current.target.position.copy(cameraVecsUnder);

    spotLight.current.target.updateMatrixWorld();
  });

  return (
    <>
      <spotLight
        ref={spotLight}
        //   position={[0, 2, 0]}
        intensity={2.5}
        distance={5}
        decay={5}
        penumbra={0.1}
        color={'white'}
      />
    </>
  );
}
