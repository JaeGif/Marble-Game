import React from 'react';
import { Platform } from '../constructors/Blocks';
import FollowSpot from '../lights/FollowSpot';
import Camera from '../interactables/Camera';
import Lights from '../lights/Lights';

function Level14() {
  return (
    <>
      <color args={['#000']} attach='background' />
      <Lights />
      <Camera modality='locked' />
      <Platform type={'start'} position={[0, 0, 0]} />
      <Platform type={'speed'} position={[0, 0, 1]} rotation={[0, 0, 0]} />

      <Platform type={'end'} position={[0, 0, 10]} />
    </>
  );
}

export default Level14;
