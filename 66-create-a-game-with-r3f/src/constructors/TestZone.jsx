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
      <Platform
        type={'portal'}
        position={[
          [0, 0, 2],
          [1, 0, 2],
        ]}
      />
      <Platform type={'end'} position={[0, 0, 4]} />
    </>
  );
}

export default TestZone;

// portal be the circle like before, on cooldown it should contract
