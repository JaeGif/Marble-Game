import React from 'react';
import { Platform } from '../constructors/Blocks';
import Camera from '../interactables/Camera';
import Lights from '../lights/Lights';

function Level28() {
  return (
    <>
      <color args={['#bdedfc']} attach='background' />
      <Lights />
      <Camera modality='locked' />
      <Platform type={'start'} position={[0, 0, 0]} />
      <Platform
        type={'switch'}
        position={[
          [-2, 0, 1],
          [0, 0, 3.4],
        ]}
        options={{ floor: 'floor', endGatePosition: [0, -1, 3.4] }}
      />
      <Platform type={'limbo'} position={[0, 0, 1]} />

      <Platform
        type={'passThrough'}
        position={[0, 0, 2.5]}
        scale={{ x: 0.5, y: 1, z: 2 }}
      />
      <Platform type={'floor'} position={[0, 0, 4]} />
      <Platform type={'end'} position={[0, 0, 5]} />
    </>
  );
}

export default Level28;
