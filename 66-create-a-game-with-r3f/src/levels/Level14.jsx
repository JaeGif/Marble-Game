import React from 'react';
import { Platform } from '../constructors/Blocks';
import FollowSpot from '../lights/FollowSpot';
import Camera from '../interactables/Camera';

function Level14() {
  return (
    <>
      <color args={['#000']} attach='background' />
      <FollowSpot />
      <Camera modality='birdseye' />
      <Platform
        type={'start'}
        position={[0, 0, 0]}
        textRotation={[-Math.PI / 2, 0, 0]}
      />
      <Platform type={'axe'} position={[0, 0, 1]} />
      <Platform type={'axe'} position={[0, 0, 2]} />
      <Platform type={'axe'} options={{ floor: 'none' }} position={[0, 0, 2]} />
      <Platform type={'spinner'} position={[0, 0, 3]} />
      <Platform
        type={'end'}
        position={[0, 0, 4]}
        textRotation={[-Math.PI / 2, 0, 0]}
        options={{ floor: 'floor', textSize: 's' }}
      />
    </>
  );
}

export default Level14;
