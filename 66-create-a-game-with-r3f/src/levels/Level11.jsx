import React from 'react';
import { Platform } from '../constructors/Blocks';

function Level11() {
  return (
    <>
      // lower level
      <Platform type={'start'} position={[0, 0, 0]} />
      <Platform type={'end'} position={[0, -3, 10]} />
      <Platform
        type={'travel'}
        position={[0, 0, 1]}
        options={{ amplitude: 1, period: 1 }}
      />
    </>
  );
}

export default Level11;
