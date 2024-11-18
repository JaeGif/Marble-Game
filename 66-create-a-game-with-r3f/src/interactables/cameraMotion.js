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

const cameraBirdsEye = (state, delta, x, z, debug) => {
  // move camera in x and z only
  const cameraPosition = new THREE.Vector3();
  cameraPosition.x += x;
  if (debug) {
    cameraPosition.y += 20;
  } else cameraPosition.y += 4.25;
  cameraPosition.z += z;

  state.camera.position.copy(cameraPosition);
};

const cameraCenterBird = (
  debug,
  bodyPosition,
  smoothedCameraPosition,
  smoothedCameraTarget,
  state,
  delta
) => {
  const cameraPosition = new THREE.Vector3();
  cameraPosition.copy(bodyPosition);

  if (debug) {
    cameraPosition.y += 20;
  } else cameraPosition.y += 4;

  const cameraTarget = new THREE.Vector3();
  cameraTarget.copy(bodyPosition);

  smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
  smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

  state.camera.position.copy(smoothedCameraPosition);
  state.camera.lookAt(smoothedCameraTarget);
};

export const cameraLogicTree = (
  debug,
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
    if (cameraCenter && !cameraBirdCenter) {
      setCameraBirdCenter(true);
      cameraXRef.current = bodyPosition.x;
      cameraZRef.current = bodyPosition.z;
    }
    if (
      (cameraLeft || cameraRight || cameraUp || cameraDown) &&
      cameraBirdCenter
    ) {
      setCameraBirdCenter(false);
    }
    if (cameraBirdCenter) {
      cameraCenterBird(
        debug,
        bodyPosition,
        smoothedCameraPosition,
        smoothedCameraTarget,
        state,
        delta
      );
    }
    if (!cameraBirdCenter) {
      if (cameraLeft) {
        cameraXRef.current += -0.1;
      }
      if (cameraRight) {
        cameraXRef.current += 0.1;
      }
      if (cameraUp) {
        cameraZRef.current += -0.1;
      }
      if (cameraDown) {
        cameraZRef.current += 0.1;
      }
      cameraBirdsEye(
        state,
        delta,
        cameraXRef.current,
        cameraZRef.current,
        debug
      );
    }
  }
};
