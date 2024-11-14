import React from 'react';
import { Platform } from '../constructors/Blocks';

function Level13() {
  return (
    <>
      <Platform type={'start'} position={[0, 0, 0]} />
      <Platform type={'limbo'} position={[0, 0, 1]} />
      <Platform
        type={'limbo'}
        options={{ floor: 'none' }}
        position={[0, 0, 1]}
      />
      <Platform
        type={'limbo'}
        options={{ floor: 'bounce' }}
        position={[0, 0, 1]}
      />

      <Platform type={'end'} position={[0, 0, 10]} />
    </>
  );
}

export default Level13;
