import { useState, useEffect, useRef } from 'react';
import { cameraLogicTree } from './cameraMotion';
import useGame from '../stores/useGame';
import { PerspectiveCamera, useKeyboardControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useRapier } from '@react-three/rapier';
import * as THREE from 'three';

function Camera({ modality = 'locked' }) {
  const { world } = useRapier();
  const [subscribeKeys, getKeys] = useKeyboardControls();
  // 'locked' | 'free' | 'birdseye'
  const [cameraMode, setCameraMode] = useState(modality);
  const [cameraBirdCenter, setCameraBirdCenter] = useState(true);
  const [playerBody, setPlayerBody] = useState(null);

  const hAngleRef = useRef(Math.PI / 2); // Horizontal dolly angle
  const vAngleRef = useRef(Math.PI / 2); // Vertical dolly angle

  const cameraXRef = useRef(0); // Horizontal dolly angle
  const cameraZRef = useRef(0); // Vertical dolly angle

  const [smoothedCameraPosition] = useState(() => {
    if (modality === 'locked') return new THREE.Vector3(10, 10, 10);
    else if (modality === 'birdseye') return new THREE.Vector3(0, 0, 0);
  });
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());

  useEffect(() => {
    const unsubscribePlayerHandle = useGame.subscribe(
      (state) => state.globalPlayerHandle,
      (handle) => {
        setPlayerBody(world.getRigidBody(handle));
      }
    );

    return () => {
      unsubscribePlayerHandle();
    };
  }, []);
  useFrame((state, delta) => {
    const { cameraLeft, cameraRight, cameraUp, cameraDown, cameraCenter } =
      getKeys();
    if (!playerBody) return;
    const bodyPosition = playerBody.translation();
    cameraLogicTree(
      bodyPosition,
      smoothedCameraPosition,
      smoothedCameraTarget,
      state,
      delta,
      cameraMode,
      setCameraMode,
      cameraBirdCenter,
      setCameraBirdCenter,
      hAngleRef,
      vAngleRef,
      cameraXRef,
      cameraZRef,
      cameraLeft,
      cameraRight,
      cameraUp,
      cameraDown,
      cameraCenter
    );
  });

  return (
    <PerspectiveCamera
      makeDefault
      near={0.1}
      far={200}
      position={[2.5, 4, 6]}
      fov={45}
      // rotation={modality === 'birdseye' ? [0, 0, 0] : undefined}
    />
  );
}

export default Camera;
/*       camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [2.5, 4, 6],
      }} */
