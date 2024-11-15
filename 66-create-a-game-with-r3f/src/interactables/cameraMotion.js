import * as THREE from 'three';

const cameraFollow = (
  bodyPosition,
  smoothedCameraPosition,
  smoothedCameraTarget,
  state,
  delta
) => {
  const cameraPosition = new THREE.Vector3();
  cameraPosition.copy(bodyPosition);

  cameraPosition.z += 3.25;
  cameraPosition.y += 0.65;

  const cameraTarget = new THREE.Vector3();
  cameraTarget.copy(bodyPosition);
  cameraTarget.y += 0.25;

  smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
  smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

  state.camera.position.copy(smoothedCameraPosition);
  state.camera.lookAt(smoothedCameraTarget);
};

const cameraRotate = (
  bodyPosition,
  smoothedCameraPosition,
  smoothedCameraTarget,
  hRadians,
  vRadians,
  hAngleRef,
  vAngleRef,
  state,
  delta
) => {
  const cameraPosition = new THREE.Vector3();
  // cameraPosition.copy(bodyPosition);

  const RADIUS = 3.315;

  // Calculate the camera position
  hAngleRef.current += hRadians * delta;
  hAngleRef.current %= Math.PI * 2;

  vAngleRef.current += vRadians * delta;
  vAngleRef.current %= Math.PI * 2;
  // Clamp the vertical angle between a small positive angle and PI to avoid flipping at poles
  vAngleRef.current = Math.max(0.1, Math.min(Math.PI - 0.1, vAngleRef.current));

  const x =
    bodyPosition.x +
    RADIUS * Math.sin(vAngleRef.current) * Math.cos(hAngleRef.current);
  const y = bodyPosition.y + RADIUS * Math.cos(vAngleRef.current);
  const z =
    bodyPosition.z +
    RADIUS * Math.sin(hAngleRef.current) * Math.sin(vAngleRef.current);

  cameraPosition.x = x;
  cameraPosition.y = y;
  cameraPosition.z = z;

  const cameraTarget = new THREE.Vector3();
  cameraTarget.copy(bodyPosition);
  cameraTarget.y += 0.25;

  smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
  smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

  state.camera.position.copy(smoothedCameraPosition);
  state.camera.lookAt(smoothedCameraTarget);
};

const cameraBirdsEye = () => {};

const cameraCenterBird = (
  bodyPosition,
  smoothedCameraPosition,
  smoothedCameraTarget,
  state,
  delta
) => {
  // [2.5, 4, 6]

  const cameraPosition = new THREE.Vector3();
  cameraPosition.copy(bodyPosition);

  cameraPosition.y += 3;
  // console.log(cameraPosition);

  const cameraTarget = new THREE.Vector3();
  cameraTarget.copy(bodyPosition);

  smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
  smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

  state.camera.position.copy(smoothedCameraPosition);
  state.camera.lookAt(smoothedCameraTarget);
};

export const cameraLogicTree = (
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
) => {
  let vAngle = 0;
  let hAngle = 0;

  // camera mode updates
  if (cameraCenter && cameraMode !== 'birdseye') {
    setCameraMode('locked');
  }
  if (
    (cameraLeft || cameraRight || cameraUp || cameraDown) &&
    cameraMode === 'locked'
  ) {
    setCameraMode('free');
  }

  // camera motion modals
  if (cameraMode === 'locked') {
    cameraFollow(
      bodyPosition,
      smoothedCameraPosition,
      smoothedCameraTarget,
      state,
      delta
    );
  }
  if (cameraMode === 'free') {
    if (cameraLeft) {
      hAngle += -2;
    }
    if (cameraRight) {
      hAngle += 2;
    }
    if (cameraUp) {
      vAngle += -2;
    }
    if (cameraDown) {
      vAngle += 2;
    }
    cameraRotate(
      bodyPosition,
      smoothedCameraPosition,
      smoothedCameraTarget,
      hAngle,
      vAngle,
      hAngleRef,
      vAngleRef,
      state,
      delta
    );
  }

  if (cameraMode === 'birdseye') {
    let cameraX = 0;
    let cameraZ = 0;

    if (cameraCenter && !cameraBirdCenter) {
      setCameraBirdCenter(true);
    }
    if (
      (cameraLeft || cameraRight || cameraUp || cameraDown) &&
      cameraBirdCenter
    ) {
      setCameraBirdCenter(false);
    }
    if (cameraBirdCenter) {
      cameraCenterBird(
        bodyPosition,
        smoothedCameraPosition,
        smoothedCameraTarget,
        state,
        delta
      );
    }
    if (!cameraBirdCenter) {
      if (cameraLeft) {
        cameraX += -2;
      }
      if (cameraRight) {
        cameraX += 2;
      }
      if (cameraUp) {
        cameraZ += -2;
      }
      if (cameraDown) {
        cameraZ += 2;
      }
    }
  }
};
