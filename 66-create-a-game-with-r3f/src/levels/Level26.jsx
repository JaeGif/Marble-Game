import React from 'react';
import { Platform } from '../constructors/Blocks';
import Camera from '../interactables/Camera';
import Lights from '../lights/Lights';

function Level26() {
  return (
    <>
      <color args={['#bdedfc']} attach='background' />
      <Lights />
      <Camera modality='locked' />
      <Platform type={'start'} position={[0, 0, 0]} />
      <Platform
        type={'passThrough'}
        position={[0, 0, 2]}
        scale={{ x: 1, y: 1, z: 3 }}
      />
      <Platform type={'floor'} position={[0, 0, 4]} />
      <Platform
        type={'passThrough'}
        position={[0, 1, 5]}
        scale={{ x: 1, y: 2, z: 1 }}
      />
      <Platform type={'floor'} position={[0, 3, 5]} />
      <Platform type={'axe'} position={[0, 3, 6]} />
      <Platform type={'spinner'} position={[0, 3, 7]} />
      <Platform
        type={'spinner'}
        position={[0, 3, 7]}
        options={{ floor: 'none' }}
      />
      <Platform type={'flipGravity'} position={[0, 3, 8]} />
      <Platform
        type={'flipGravity'}
        position={[0, -0.5, 5.5]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <Platform type={'passThrough'} position={[0, 0, 9]} />
      <Platform
        type={'floor'}
        position={[0, 0, 9.5]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <Platform type={'flipGravity'} position={[0, -1, 9]} />

      <Platform type={'end'} position={[0, 0, 8]} />
    </>
  );
}

export default Level26;
