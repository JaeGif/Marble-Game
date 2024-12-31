import React, { useRef } from 'react';
import * as THREE from 'three';
import { RigidBody, useRapier } from '@react-three/rapier';

import useGame from '../../stores/useGame';

const UNIT_CONSTANT = -4;

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

export default BlockPassThrough;
