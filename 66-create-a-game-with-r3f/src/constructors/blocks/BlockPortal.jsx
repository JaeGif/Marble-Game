import React, { useState } from 'react';
import * as THREE from 'three';
import { RigidBody, useRapier } from '@react-three/rapier';

import useGame from '../../stores/useGame';

const portalMaterial = new THREE.MeshStandardMaterial({
  color: 'rgb(.5, .5,1)',
  transparent: true,
  opacity: 0.4,
});
const squareGeometry = new THREE.BoxGeometry(2, 2);

function BlockPortal({
  position = [
    [0, 0, 0],
    [0, 0, 1],
  ],
  rotation = [
    [0, 0, 0],
    [0, 0, 0],
  ],
  scale = { x: 1, y: 1, z: 1 },
}) {
  const portal1Position = position[0];
  const portal2Position = position[1];
  const portal1Rotation = rotation[0];
  const portal2Rotation = rotation[1];

  // if on cooldown, may not transport
  const [onCooldown, setOnCooldown] = useState(false);

  // use position and players position to determine if get benefit
  const playerHandle = useGame((state) => state.globalPlayerHandle);
  const { world } = useRapier();
  const handleCooldownTrigger = () => {
    // 5 sec cooldown
    setOnCooldown(true);
    setTimeout(() => setOnCooldown(false), 5000);
  };
  const handleUpdatePlayerLocation = (collision, position) => {
    if (onCooldown) return;

    const player = world.getRigidBody(collision.rigidBody.handle);
    if (player.handle.toString() == playerHandle.toString()) {
      // interact with player positions
      const playerLoc = {
        x: position[0],
        y: position[1] + 0.25,
        z: position[2],
      };
      player.setTranslation(playerLoc);

      handleCooldownTrigger();
    }
  };
  return (
    <>
      <group position={portal1Position} rotation={portal1Rotation}>
        <RigidBody
          type='fixed'
          sensor
          onIntersectionEnter={(collision) =>
            handleUpdatePlayerLocation(collision, portal2Position)
          }
        >
          <mesh
            geometry={squareGeometry}
            material={portalMaterial}
            scale={[1.5 * scale.x, 1.5 * scale.y, 0.3 * scale.z]}
            position={[0, 1.5, 0]}
          />
        </RigidBody>
      </group>
      <group position={portal2Position} rotation={portal2Rotation}>
        <RigidBody
          type='fixed'
          sensor
          onIntersectionEnter={(collision) =>
            handleUpdatePlayerLocation(collision, portal1Position)
          }
        >
          <mesh
            geometry={squareGeometry}
            material={portalMaterial}
            scale={[1.5 * scale.x, 1.5 * scale.y, 0.3 * scale.z]}
            position={[0, 1.5, 0]}
          />
        </RigidBody>
      </group>
    </>
  );
}

export default BlockPortal;
