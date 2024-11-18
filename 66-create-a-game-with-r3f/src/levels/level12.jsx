import React from 'react';
import { Platform } from '../constructors/Blocks';
import Lights from '../lights/Lights';
import Camera from '../interactables/Camera';
function Level12() {
  return (
    <>
      <color args={['#bdedfc']} attach='background' />
      <Lights />
      <Camera modality='locked' />
      // lower level
      <Platform type={'start'} position={[0, 0, 0]} />
      <Platform type={'spinner'} position={[0, 0, 1]} />
      <Platform type={'spinner'} position={[0, 0, 2]} />
      <Platform type={'spinner'} position={[0, 0, 3]} />
      <Platform type={'spinner'} position={[0, 0, 4]} />
      // roof
      <Platform
        type={'spinner'}
        options={{ floor: 'speed' }}
        position={[0, -0.25, 1]}
      />
      <Platform
        type={'spinner'}
        options={{ floor: 'speed' }}
        position={[0, -0.25, 2]}
      />
      <Platform
        type={'spinner'}
        options={{ floor: 'speed' }}
        position={[0, -0.25, 3]}
      />
      <Platform
        type={'spinner'}
        options={{ floor: 'speed' }}
        position={[0, -0.25, 4]}
      />
      <Platform type={'blueHealth'} position={[0, -0.25, 5]} />
      <Platform
        type={'floor'}
        position={[0, -0.75, 5.5]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <Platform type={'floor'} position={[0, 0, 5]} />
      <Platform type={'floor'} position={[1, 0, 5]} />
      <Platform
        type={'limbo'}
        position={[3, 0, 5]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <Platform
        type={'limbo'}
        position={[3, 0, 5]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <Platform
        type={'end'}
        position={[4, 0, 5]}
        rotation={[0, Math.PI / 2, 0]}
      />
    </>
  );
}

export default Level12;
