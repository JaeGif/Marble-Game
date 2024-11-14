import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useRapier } from '@react-three/rapier';
import useGame from '../stores/useGame';
export default function FollowSpot() {
  const spotLight = useRef();
  const dirLight = useRef();

  const { world } = useRapier();

  const globalPlayerHandle = useGame((state) => state.globalPlayerHandle);

  useFrame((state, delta) => {
    const player = world.getRigidBody(globalPlayerHandle);

    if (!player) return;
    const playerPosition = player.translation();
    spotLight.current.position.x = playerPosition.x;
    spotLight.current.position.y = playerPosition.y + 1;
    spotLight.current.position.z = playerPosition.z + 0.1;

    spotLight.current.target.position.copy(playerPosition);

    spotLight.current.target.updateMatrixWorld();
    /* 
    dirLight.current.position.x = state.camera.position.x;
    dirLight.current.position.y = state.camera.position.y;
    dirLight.current.position.z = state.camera.position.z;
    dirLight.current.target.position.copy(playerPosition);

    dirLight.current.target.updateMatrixWorld(); */
  });
  return (
    <>
      <spotLight
        ref={spotLight}
        position={[0, 2, 0]}
        intensity={2.5}
        distance={3}
        decay={3}
        penumbra={0.1}
        color={'white'}
      />
    </>
  );
}
