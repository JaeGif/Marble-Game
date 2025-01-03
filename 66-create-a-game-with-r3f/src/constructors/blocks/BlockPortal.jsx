import React, { useState } from 'react';
import * as THREE from 'three';
import { RigidBody, useRapier } from '@react-three/rapier';
import { Float, useGLTF } from '@react-three/drei';
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
  const { nodes } = useGLTF('./models/portalOnly.glb');

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
          <group
            dispose={null}
            position={[0, -0.25, 4]}
            scale={[2.5 * scale.x, 2.5 * scale.y, 2.5 * scale.z]}
          >
            <mesh
              castShadow
              geometry={nodes.Circle.geometry}
              position={[0.1, 1, -0.4]}
            />
            <Float floatIntensity={0.5} rotationIntensity={0.1}>
              <mesh
                castShadow
                geometry={nodes.float1.geometry}
                material={nodes.float1.material}
                position={[-0.2, 0.9, -1.6]}
              />
            </Float>
            <Float floatIntensity={0.5} rotationIntensity={0.1}>
              <mesh
                castShadow
                geometry={nodes.float2.geometry}
                material={nodes.float1.material}
                position={[0, 1.3, -1.8]}
                rotation={[0, 0, 0.1]}
              />
            </Float>
            <Float floatIntensity={0.5} rotationIntensity={0.1}>
              <mesh
                castShadow
                geometry={nodes.float5.geometry}
                material={nodes.float1.material}
                position={[0.1, 0.9, -1.5]}
              />
            </Float>
            <Float floatIntensity={0.5} rotationIntensity={0.1}>
              <mesh
                castShadow
                geometry={nodes.float4.geometry}
                material={nodes.float1.material}
                position={[0.4, 1, -1.5]}
              />
            </Float>
            <Float floatIntensity={0.5} rotationIntensity={0.1}>
              <mesh
                castShadow
                geometry={nodes.float3.geometry}
                material={nodes.float1.material}
                position={[1.6, 1.2, -2]}
              />
            </Float>
            <Float floatIntensity={0.5} rotationIntensity={0.1}>
              <mesh
                castShadow
                geometry={nodes.float6.geometry}
                material={nodes.float1.material}
                position={[-0.2, 0.7, -1.7]}
              />
            </Float>
          </group>
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
          <group
            dispose={null}
            position={[0, -0.25, 4]}
            scale={[2.5 * scale.x, 2.5 * scale.y, 2.5 * scale.z]}
          >
            <mesh
              castShadow
              geometry={nodes.Circle.geometry}
              position={[0.1, 1, -0.4]}
            />
            <Float floatIntensity={0.5} rotationIntensity={0.1}>
              <mesh
                castShadow
                geometry={nodes.float1.geometry}
                material={nodes.float1.material}
                position={[-0.2, 0.9, -1.6]}
              />
            </Float>
            <Float floatIntensity={0.5} rotationIntensity={0.1}>
              <mesh
                castShadow
                geometry={nodes.float2.geometry}
                material={nodes.float1.material}
                position={[0, 1.3, -1.8]}
                rotation={[0, 0, 0.1]}
              />
            </Float>
            <Float floatIntensity={0.5} rotationIntensity={0.1}>
              <mesh
                castShadow
                geometry={nodes.float5.geometry}
                material={nodes.float1.material}
                position={[0.1, 0.9, -1.5]}
              />
            </Float>
            <Float floatIntensity={0.5} rotationIntensity={0.1}>
              <mesh
                castShadow
                geometry={nodes.float4.geometry}
                material={nodes.float1.material}
                position={[0.4, 1, -1.5]}
              />
            </Float>
            <Float floatIntensity={0.5} rotationIntensity={0.1}>
              <mesh
                castShadow
                geometry={nodes.float3.geometry}
                material={nodes.float1.material}
                position={[1.6, 1.2, -2]}
              />
            </Float>
            <Float floatIntensity={0.5} rotationIntensity={0.1}>
              <mesh
                castShadow
                geometry={nodes.float6.geometry}
                material={nodes.float1.material}
                position={[-0.2, 0.7, -1.7]}
              />
            </Float>
          </group>
        </RigidBody>
      </group>
    </>
  );
}

export default BlockPortal;
