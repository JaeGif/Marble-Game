import React from 'react';
import { Platform } from '../constructors/Blocks';
import Camera from '../interactables/Camera';
import Lights from '../lights/Lights';

function Level27() {
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
        position={[2, 0, 4]}
        scale={{ x: 3, y: 1, z: 1 }}
      />
      <Platform
        type={'passThrough'}
        position={[-2, 0, 4]}
        scale={{ x: 3, y: 1, z: 1 }}
      />
      <Platform type={'spinner'} position={[-4, 0, 4]} />{' '}
      <Platform type={'floor'} position={[-4, 0, 3]} />
      <Platform type={'floor'} position={[-5, 0, 4]} />
      <Platform type={'floor'} position={[-5, 0, 3]} />
      <Platform
        type={'spinner'}
        position={[4, 0, 4]}
        rotation={[0, 0, Math.PI]}
      />
      <Platform
        type={'spinner'}
        position={[4, 0, 4]}
        options={{ floor: 'none' }}
      />
      <Platform
        type={'passThrough'}
        position={[-4, 0, 5.5]}
        scale={{ x: 1, y: 1, z: 2 }}
      />
      <Platform
        type={'passThrough'}
        position={[4, 0, 5.5]}
        scale={{ x: 1, y: 1, z: 2 }}
      />
      <Platform type={'blueHealth'} position={[4, 0, 7]} />
      <Platform
        type={'blueHealth'}
        position={[4, 0, 7]}
        rotation={[0, 0, Math.PI]}
        options={{ floor: 'none' }}
      />
      <Platform type={'floor'} position={[-4, 0, 7]} />
      <Platform type={'floor'} position={[-4, 1, 8]} />
      <Platform type={'flipGravity'} position={[-4, 1, 7]} />
      <Platform type={'floor'} position={[-4, 1, 9]} />
      <Platform
        type={'passThrough'}
        position={[0, 0, 7]}
        scale={{ x: 1, y: 1, z: 5 }}
      />
      <Platform
        type={'spinner'}
        position={[0, 0, 10]}
        options={{ floor: 'none' }}
      />
      <Platform type={'end'} position={[0, 0, 10]} rotation={[0, 0, Math.PI]} />
    </>
  );
}

export default Level27;
