import React from 'react';
import { Platform } from '../constructors/Blocks';
import Camera from '../interactables/Camera';
import Lights from '../lights/Lights';

function Level23() {
  return (
    <>
      <color args={['#bdedfc']} attach='background' />
      <Lights />
      <Camera modality='locked' />
      <Platform type={'start'} position={[0, 0, 0]} />{' '}
      <Platform type={'floor'} position={[0, 0, 1]} />
      <Platform type={'floor'} position={[0, 0, 2]} />
      <Platform type={'floor'} position={[0, 0, 3]} />
      <Platform
        type={'gravity'}
        position={[0, 0, 4]}
        gravitationalConstant={-4}
        maxDistance={8}
        options={{ floor: 'none' }}
      />
      <Platform type={'blueHealth'} position={[0, 1, 2]} />
      <Platform
        type={'gravity'}
        position={[0, 0, 2]}
        rotation={[Math.PI, 0, 0]}
        gravitationalConstant={5}
        maxDistance={5}
        options={{ floor: 'none' }}
      />
      <Platform type={'flipGravity'} position={[0, 1, 3]} />
      <Platform type={'floor'} position={[0, -2, 5]} />
      <Platform type={'flipGravity'} position={[0, -2, 6]} />
      <Platform
        type={'blueHealth'}
        position={[0, 0, 6]}
        options={{ floor: 'none' }}
        rotation={[Math.PI, 0, 0]}
      />{' '}
      <Platform type={'floor'} position={[0, 0, 7]} />
      <Platform type={'end'} position={[0, 0, 6]} />
    </>
  );
}

export default Level23;
