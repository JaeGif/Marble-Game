import * as THREE from 'three';

export const playerActionsLogicTree = (
  bodyRef,
  delta,
  state,
  movementMode,
  forward,
  backward,
  leftward,
  rightward
) => {
  // Player Actions

  if (!bodyRef.current) return;
  const impulse = new THREE.Vector3();
  const torque = new THREE.Vector3();

  const impulseStrength = 0.6 * delta;
  const torqueStrength = 0.2 * delta;
  // get the camera forward vec and normalize it
  //    apply the forces to that
  if (movementMode === 'original') {
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
  }
  if (movementMode === 'normal') {
    const direction = new THREE.Vector3(0, 0, -1);
    state.camera.getWorldDirection(direction);
    direction.y = 0;
    // rightward perpendicular vector

    const unitDirection = direction.normalize();

    const rightDirection = new THREE.Vector3()
      .crossVectors(state.camera.up, unitDirection)
      .normalize()
      .negate();

    if (forward) {
      impulse.add(unitDirection.clone().multiplyScalar(impulseStrength)); // Apply forward movement
      torque.add(rightDirection.clone().multiplyScalar(-torqueStrength));
    }
    if (backward) {
      impulse.add(unitDirection.clone().multiplyScalar(-impulseStrength)); // Apply backward movement
      torque.add(rightDirection.clone().multiplyScalar(torqueStrength));
    }
    if (leftward) {
      impulse.add(rightDirection.clone().multiplyScalar(-impulseStrength)); // Apply leftward movement
      torque.add(unitDirection.clone().multiplyScalar(-torqueStrength));
    }
    if (rightward) {
      impulse.add(rightDirection.clone().multiplyScalar(impulseStrength)); // Apply rightward movement
      torque.add(unitDirection.clone().multiplyScalar(torqueStrength));
    }
  }
  bodyRef.current.applyImpulse(impulse);
  bodyRef.current.applyTorqueImpulse(torque);
};
