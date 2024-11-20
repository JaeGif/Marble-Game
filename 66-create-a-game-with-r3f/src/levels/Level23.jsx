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
      <Platform
        type={'gravity'}
        position={[0, 0, 3]}
        gravitationalConstant={-4}
        maxDistance={8}
        options={{ floor: 'none' }}
      />
      <Platform
        type={'gravity'}
        position={[1, 0, 1]}
        gravitationalConstant={4}
        maxDistance={8}
        options={{ floor: 'none' }}
      />
      <Platform
        type={'gravity'}
        position={[-1, 0, 2]}
        gravitationalConstant={4}
        maxDistance={8}
        options={{ floor: 'none' }}
      />
      <Platform type={'floor'} position={[0, 0, 2]} />
      <Platform type={'end'} position={[0, 0, 5]} />
    </>
  );
}

export default Level23;
