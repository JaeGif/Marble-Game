import React from 'react';
import { Platform } from '../constructors/Blocks';
import Lights from '../lights/Lights';
function Level6() {
  return (
    <>
      <color args={['#bdedfc']} attach='background' />
      <Lights />

      <Platform type={'start'} position={[0, 0, 0]} />
      <Platform type={'spinner'} position={[-1, 0, 1]} />
      <Platform type={'floor'} position={[0, 0, 3]} />
      <Platform type={'end'} position={[0, 0, 4]} />
    </>
  );
}

export default Level6;
