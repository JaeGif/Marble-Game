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
        type={'gravity'}
        position={[0, 0, 1]}
        gravitationalConstant={2}
        maxDistance={8}
      />
      <Platform type={'floor'} position={[0, 0, 2]} />
      <Platform
        type={'gravity'}
        position={[0, 0, 3]}
        gravitationalConstant={-2}
        maxDistance={8}
      />
      <Platform type={'floor'} position={[0, 0, 4]} />
      <Platform type={'end'} position={[0, 0, 5]} />
    </>
  );
}

export default Level27;
