import React from 'react';
import { Platform } from '../constructors/Blocks';
import Camera from '../interactables/Camera';
import Lights from '../lights/Lights';

function Level20() {
  return (
    <>
      <color args={['#bdedfc']} attach='background' />
      <Lights />
      <Camera modality='locked' />
      <Platform type={'start'} position={[0, 0, 0]} />
      <Platform type={'spinner'} position={[0, 0, 1]} />
      <Platform
        type={'gravity'}
        gravitationalConstant={8.5}
        maxDistance={5}
        options={{ floor: 'none' }}
        position={[0, 0, 1]}
      />
      <Platform type={'floor'} position={[0, 0, 2]} />
      <Platform type={'floor'} position={[0, 0, 3]} />
      <Platform type={'floor'} position={[0, 0, 4]} />
      <Platform type={'axe'} position={[0, 0, 4]} />
      <Platform
        type={'gravity'}
        gravitationalConstant={-7}
        maxDistance={5}
        options={{ floor: 'none' }}
        position={[0, 0, 4]}
      />
      <Platform type={'floor'} position={[0, 0, 5]} />
      <Platform type={'end'} position={[0, 0, 6]} />
    </>
  );
}

export default Level20;
