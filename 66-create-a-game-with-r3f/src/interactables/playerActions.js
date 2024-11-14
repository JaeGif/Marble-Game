import * as THREE from 'three';

export const playerActionsLogicTree = (
  bodyRef,
  delta,
  cameraLocked,
  state,
  forward,
  backward,
  leftward,
  rightward
) => {
  // Player Actions
  const impulse = { x: 0, y: 0, z: 0 };
  const torque = { x: 0, y: 0, z: 0 };

  const impulseStrength = 0.6 * delta;
  const torqueStrength = 0.2 * delta;

  if (forward) {
    impulse.z -= impulseStrength;
    torque.x -= torqueStrength;
  }
  if (backward) {
    impulse.z += impulseStrength;
    torque.x += torqueStrength;
  }
  if (leftward) {
    impulse.x -= impulseStrength;
    torque.z += torqueStrength;
  }
  if (rightward) {
    impulse.x += impulseStrength;
    torque.z -= torqueStrength;
  }

  bodyRef.current.applyImpulse(impulse);
  bodyRef.current.applyTorqueImpulse(torque);
};
