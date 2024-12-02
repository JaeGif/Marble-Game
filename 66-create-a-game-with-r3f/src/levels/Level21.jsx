import React from 'react';
import { Platform } from '../constructors/Blocks';
import Camera from '../interactables/Camera';
import Lights from '../lights/Lights';

function Level21() {
  return (
    <>
      <color args={['#bdedfc']} attach='background' />
      <Lights />
      <Camera modality='locked' />

      <Platform type={'start'} position={[0, 0, 0]} />
      <Platform type={'flipGravity'} position={[0, 0, 1]} />

      <Platform type={'floor'} position={[0, -3, 1]} />
      <Platform type={'floor'} position={[0, -3, 2]} />
      <Platform
        type={'spinner'}
        position={[0, -3, 3]}
        rotation={[Math.PI, 0, 0]}
      />
      <Platform type={'flipGravity'} position={[0, -3, 4]} />

      <Platform type={'floor'} position={[0, 0, 4]} />
      <Platform type={'floor'} position={[0, 0, 5]} />

      <Platform type={'end'} position={[0, 0, 6]} />
    </>
  );
}

export default Level21;
