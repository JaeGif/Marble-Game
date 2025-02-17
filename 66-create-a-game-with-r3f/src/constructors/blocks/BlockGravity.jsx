import React, { useRef } from 'react';
import { shaderMaterial, Float, useFBO } from '@react-three/drei';
import { useFrame, extend } from '@react-three/fiber';
import useGame from '../../stores/useGame';

import { useRapier } from '@react-three/rapier';
import * as THREE from 'three';

import vertexShader from '../shaders/gravity/vertex.glsl';
import fragmentShader from '../shaders/gravity/fragment.glsl';

const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);
const DARK_STRENGTH_MOD = 0.25;
const LIGHT_STRENGTH_MOD = 3;

const GravityShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uSceneTexture: null,
    uColorStrength: DARK_STRENGTH_MOD * 0.7,
    uResolution: [window.innerWidth, window.innerHeight],
    uRefractiveIndex: 0.7,
    uRandom: Math.random(),
  },
  vertexShader,
  fragmentShader
);
const AntiGravityShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uSceneTexture: null,
    uColorStrength: LIGHT_STRENGTH_MOD * 0.7,
    uResolution: [window.innerWidth, window.innerHeight],
    uRefractiveIndex: 0.7,
    uRandom: Math.random(),
  },
  vertexShader,
  fragmentShader
);
extend({ GravityShaderMaterial });
extend({ AntiGravityShaderMaterial });

function DistortingSphere({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  gravitationalConstant = 1,
  maxDistance = 4,
  type,
  renderTarget,
}) {
  const sourcePosition = [0, 1, 0];
  // This block exerts force on the player towards it or away from it
  const playerHandle = useGame((state) => state.globalPlayerHandle);
  const { world } = useRapier();
  const innerGravityShaderRef = useRef();
  const outerGravityShaderRef = useRef();

  useFrame((state, delta) => {
    innerGravityShaderRef.current.uniforms.uTime.value += delta;
    outerGravityShaderRef.current.uniforms.uTime.value += delta;

    const player = world.getRigidBody(playerHandle);
    if (!player) return;

    const playerPosition = player.translation();

    // Calculate vector from object to source
    const direction = {
      x: sourcePosition[0] + position[0] - playerPosition.x,
      y: sourcePosition[1] * 0.01 + position[1] - playerPosition.y,
      z: sourcePosition[2] + position[2] - playerPosition.z,
    };

    // Calculate distance
    const distance = Math.max(
      1, // Minimum distance to avoid infinite forces
      Math.sqrt(direction.x ** 2 + direction.y ** 2 + direction.z ** 2)
    );

    // Custom decay: Force is zero if beyond maxDistance
    if (distance <= maxDistance) {
      // Rapid decay using quadratic falloff
      const decayFactor = (1 - distance / maxDistance) ** 2;
      const forceMagnitude = (gravitationalConstant * decayFactor) / 20;

      // Normalize direction and calculate force
      const normalizedDirection = {
        x: direction.x / distance,
        y: direction.y / distance,
        z: direction.z / distance,
      };

      // Get current velocity
      const currentVelocity = player.linvel();

      // Increment velocity by scaled force
      let newVelocity = {
        x: currentVelocity.x + normalizedDirection.x * forceMagnitude,
        y: currentVelocity.y + normalizedDirection.y * forceMagnitude,
        z: currentVelocity.z + normalizedDirection.z * forceMagnitude,
      };

      // Clamp velocity to maxVelocity
      const velocityMagnitude = Math.sqrt(
        newVelocity.x ** 2 + newVelocity.y ** 2 + newVelocity.z ** 2
      );
      const maxVelocity = 15;
      if (velocityMagnitude > maxVelocity) {
        const scale = maxVelocity / velocityMagnitude;
        newVelocity = {
          x: newVelocity.x * scale,
          y: newVelocity.y * scale,
          z: newVelocity.z * scale,
        };
      }

      player.setLinvel(newVelocity);
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <Float floatIntensity={2}>
        <>
          <mesh
            scale={[0.2, 0.2, 0.2]}
            geometry={sphereGeometry}
            position={sourcePosition}
          >
            {gravitationalConstant > 0 ? (
              <gravityShaderMaterial
                transparent
                ref={innerGravityShaderRef}
                uSceneTexture={renderTarget.texture}
                uResolution={[window.innerWidth, window.innerHeight]}
                uRefractiveIndex={1}
                uRandom={Math.random()}
              />
            ) : (
              <antiGravityShaderMaterial
                transparent
                side={2}
                uSceneTexture={renderTarget.texture}
                uResolution={[window.innerWidth, window.innerHeight]}
                uRefractiveIndex={1}
                ref={innerGravityShaderRef}
                uColorStrength={LIGHT_STRENGTH_MOD * 1.0}
              />
            )}
          </mesh>
          <mesh
            scale={[0.5, 0.5, 0.5]}
            geometry={sphereGeometry}
            position={sourcePosition}
          >
            {gravitationalConstant > 0 ? (
              <gravityShaderMaterial
                ref={outerGravityShaderRef}
                transparent
                uSceneTexture={renderTarget.texture}
                uResolution={[window.innerWidth, window.innerHeight]}
                uRefractiveIndex={0.5}
                uRandom={Math.random()}
              />
            ) : (
              <antiGravityShaderMaterial
                transparent
                side={2}
                uSceneTexture={renderTarget.texture}
                uResolution={[window.innerWidth, window.innerHeight]}
                uColorStrength={LIGHT_STRENGTH_MOD * 0.5}
                uRefractiveIndex={0.5}
                ref={outerGravityShaderRef}
              />
            )}
          </mesh>
        </>
      </Float>
    </group>
  );
}

function BlockGravity({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  gravitationalConstant = 1,
  maxDistance = 4,
  type,
  renderTarget,
}) {
  const fbo = useFBO();

  useFrame(({ gl, scene, camera }) => {
    gl.setRenderTarget(fbo);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
  });

  return (
    <>
      <DistortingSphere
        position={position}
        rotation={rotation}
        gravitationalConstant={gravitationalConstant}
        maxDistance={maxDistance}
        type={type}
        renderTarget={fbo}
      />
    </>
  );
}

export default BlockGravity;
