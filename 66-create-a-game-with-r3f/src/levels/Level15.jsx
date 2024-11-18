import React from 'react';
import { Platform } from '../constructors/Blocks';
import FollowSpot from '../lights/FollowSpot';
import Camera from '../interactables/Camera';
import Lights from '../lights/Lights';

function Level15() {
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
      <Platform type={'floor'} position={[0, 0, 1]} />
      <Platform type={'limbo'} position={[0, 0, 2]} />
      <Platform type={'spinner'} position={[1, 0, 2]} />
      <Platform type={'floor'} position={[1, 0, 3]} />

      <Platform
        type={'end'}
        position={[2, 0, 3]}
        textRotation={[-Math.PI / 2, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        options={{ floor: 'floor', textSize: 's' }}
      />
    </>
  );
}

export default Level15;
