import React from 'react';
import { Platform } from '../constructors/Blocks';

function Level8() {
  return (
    <>
      <Platform type={'start'} position={[0, 0, 0]} />
      <Platform
        type={'portal'}
        position={[
          [0, 0, 1],
          [0, -4, 3],
        ]}
      />
      <Platform type={'floor'} position={[0, -4, 4]} />

      <Platform type={'end'} position={[0, -4, 5]} />
    </>
  );
}

export default Level8;
