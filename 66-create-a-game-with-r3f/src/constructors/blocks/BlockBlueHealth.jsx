import React, { useState, useMemo } from 'react';
import { RigidBody } from '@react-three/rapier';
import { Float, useGLTF } from '@react-three/drei';
import useGame from '../../stores/useGame';

function BlockBlueHealth({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const [isUncollected, setIsUncollected] = useState(true);

  const adjustLives = useGame((state) => state.adjustLives);
  const adjustScore = useGame((state) => state.adjustScore);
  const handleCollisionEnter = (foreignCollider) => {
    // up hearts and score
    adjustLives(1);
    adjustScore(1000);
    setIsUncollected(false);
  };
  const heart = useGLTF('./models/blueheart.glb');
  const heartClone = useMemo(() => heart.scene.clone(), []);

  return (
    <group position={position} rotation={rotation}>
      {isUncollected && (
        <Float rotationIntensity={0.1} floatIntensity={2} speed={3}>
          <RigidBody
            type='fixed'
            onIntersectionEnter={handleCollisionEnter}
            position={[0, 1.2, 0]}
            rotation={[0, Math.PI, 0]}
            colliders={'trimesh'}
            sensor
          >
            <primitive object={heartClone} />
          </RigidBody>
        </Float>
      )}
    </group>
  );
}

export default BlockBlueHealth;
