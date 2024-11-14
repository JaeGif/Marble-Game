import React from 'react';
import { Platform } from '../constructors/Blocks';

function Level6() {
  return (
    <>
      <color args={['#bdedfc']} attach='background' />

      <Platform type={'start'} position={[-1, -1, 0]} />
      <Platform type={'spinner'} position={[-0.5, 0, 2]} />
      <Platform type={'floor'} position={[0, 0, 3]} />
      <Platform type={'end'} position={[0, 0, 4]} />
    </>
  );
}

export default Level6;
