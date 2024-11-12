import * as THREE from 'three';

export const cameraFollow = (
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
export const cameraRotate = (
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
