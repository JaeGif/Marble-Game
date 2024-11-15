import { useState, useEffect, useRef } from 'react';
import { cameraLogicTree } from './cameraMotion';
import useGame from '../stores/useGame';
import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRapier } from '@react-three/rapier';
import * as THREE from 'three';

function Camera({ modality = 'locked' }) {
  const { world } = useRapier();

  const [subscribeKeys, getKeys] = useKeyboardControls();

  // 'locked' | 'free' | 'birdseye'
  const [cameraMode, setCameraMode] = useState(modality);
  const [cameraBirdCenter, setCameraBirdCenter] = useState(false);

  const [playerBody, setPlayerBody] = useState(null);

  const hAngleRef = useRef(Math.PI / 2); // Horizontal dolly angle
  const vAngleRef = useRef(Math.PI / 2); // Vertical dolly angle

  const [smoothedCameraPosition] = useState(
    () => new THREE.Vector3(10, 10, 10)
  );
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
      cameraLeft,
      cameraRight,
      cameraUp,
      cameraDown,
      cameraCenter
    );
  });

  return null;
}

export default Camera;
