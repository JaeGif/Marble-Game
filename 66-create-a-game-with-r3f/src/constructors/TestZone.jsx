import React from 'react';
import { Platform } from '../constructors/Blocks';
import Lights from '../lights/Lights';
import Camera from '../interactables/Camera';

function TestZone() {
  return (
    <>
      <color args={['#bdedfc']} attach='background' />
      <Lights />
      <Camera modality='locked' />

      <Platform type={'start'} position={[0, 0, 0]} />
      <Platform type={'floor'} position={[0, 0, 1]} />
      <Platform type={'flipGravity'} position={[0, 0, 2]} />
      <Platform
        type={'flipGravity'}
        position={[0, -1, 3]}
        rotation={[0, 0, Math.PI]}
      />
      <Platform type={'end'} position={[0, 0, 4]} />
    </>
  );
}

export default TestZone;
