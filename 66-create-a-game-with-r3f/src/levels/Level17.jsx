import React from 'react';
import { Platform } from '../constructors/Blocks';
import FollowSpot from '../lights/FollowSpot';
import Camera from '../interactables/Camera';
import Lights from '../lights/Lights';
import { Text } from '@react-three/drei';
function Level17() {
  return (
    <>
      <color args={['#000']} attach='background' />
      <FollowSpot />

      <Camera debug modality='birdseye' />
      <Platform
        type={'end'}
        position={[0, 0, -2]}
        textRotation={[-Math.PI / 2, 0, 0]}
        options={{ floor: 'floor', textSize: 's' }}
      />
      <Platform type={'floor'} position={[0, 0, -1]} />
      <Platform
        type={'start'}
        position={[0, 0, 0]}
        textRotation={[-Math.PI / 2, 0, 0]}
      />
      <Platform
        type={'bounce'}
        position={[0, 0, 1]}
        options={{ amplitude: 1, speed: 7, seed: Math.random() * 3 }}
      />
      <Platform
        type={'floor'}
        position={[0, -4, 2]}
        options={{ amplitude: 1, speed: 5, seed: Math.random() * 3 }}
      />
      <Platform
        type={'bounce'}
        position={[0, -4, 3]}
        options={{ amplitude: 1, speed: 7, seed: Math.random() * 3 }}
      />
      <Platform
        type={'floor'}
        position={[0, -7, 4]}
        options={{ amplitude: 2, speed: 5, seed: Math.random() * 3 }}
      />
      <Platform
        type={'bounce'}
        position={[0, -7, 5]}
        options={{ amplitude: 1, speed: 5, seed: Math.random() * 3 }}
      />
      <Platform type={'speed'} position={[0, -9, 6]} />
      <Text
        font='./bebas-neue-v9-latin-regular.woff'
        scale={2}
        maxWidth={0.25}
        lineHeight={0.75}
        textAlign='center'
        position={[0, 3 * 4, -9 * 4]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        Gottem
        <meshBasicMaterial toneMapped={false} />
      </Text>
    </>
  );
}

export default Level17;
