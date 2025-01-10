import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RigidBody, useRapier } from '@react-three/rapier';
import { Float, useGLTF, shaderMaterial } from '@react-three/drei';
import useGame from '../../stores/useGame';
import { useFrame, extend } from '@react-three/fiber';

import vertexShader from '../shaders/portal/vertex.glsl';
import fragmentShader from '../shaders/portal/fragment.glsl';

const PortalShaderMaterial = shaderMaterial(
  {
    uTime: 0,
  },
  vertexShader,
  fragmentShader
);
extend({ PortalShaderMaterial });
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
  const portalShaderRef = useRef();
  const portalOutShaderRef = useRef();

  const coolTimerRef = useRef(1);

  useFrame((state, delta) => {
    if (!portalShaderRef.current || !portalOutShaderRef.current) return;
    portalShaderRef.current.uniforms.uTime.value += delta;
    portalOutShaderRef.current.uniforms.uTime.value += delta;

    if (onCooldown) {
      // scale down?
      if (coolScale >= 0.25) {
        coolTimerRef.current -= state.clock.elapsedTime / 1000;
        setCoolScale(coolTimerRef.current);
      }
    } else {
      if (coolScale < 1) {
        coolTimerRef.current += state.clock.elapsedTime / 1000;
        setCoolScale(coolTimerRef.current);
      }
    }
  });
  const [coolScale, setCoolScale] = useState(1);

  return (
    <>
      <group
        position={[
          portal1Position[0],
          portal1Position[1] - coolScale + 1,
          portal1Position[2],
        ]}
        rotation={portal1Rotation}
        scale={coolScale}
      >
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
              visible={!onCooldown}
              castShadow
              geometry={nodes.Circle.geometry}
              position={[0.1, 1, -0.4]}
            >
              <portalShaderMaterial
                ref={portalShaderRef}
                transparent
                side={2}
              />
            </mesh>

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
      <group
        position={[
          portal2Position[0],
          portal2Position[1] - coolScale + 1,
          portal2Position[2],
        ]}
        rotation={portal2Rotation}
        scale={coolScale}
      >
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
              visible={!onCooldown}
              castShadow
              geometry={nodes.Circle.geometry}
              position={[0.1, 1, -0.4]}
            >
              <portalShaderMaterial
                ref={portalOutShaderRef}
                transparent
                side={2}
              />
            </mesh>
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
