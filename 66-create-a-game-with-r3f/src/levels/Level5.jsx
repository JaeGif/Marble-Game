import React from 'react';
import { Platform } from '../constructors/Blocks';
import Lights from '../lights/Lights';
import Camera from '../interactables/Camera';

function Level5() {
  return (
    <>
      <color args={['#bdedfc']} attach='background' />
      <Lights />
      <Camera modality='locked' />

      <Platform type={'start'} position={[0, 0, 0]} />
      <Platform type={'axe'} position={[0, 0, 2]} />
      <Platform type={'floor'} position={[0, 0, 4]} />
      <Platform type={'end'} position={[0, 0, 5]} />
    </>
  );
}

export default Level5;
