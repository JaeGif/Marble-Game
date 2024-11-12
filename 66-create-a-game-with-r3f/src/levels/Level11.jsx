import React from 'react';
import { Platform } from '../constructors/Blocks';

function Level11() {
  return (
    <>
      // lower level
      <Platform type={'start'} position={[0, 0, 0]} />
      <Platform type={'end'} position={[0, -3, 10]} />
      <Platform
        type={'bounce'}
        position={[0, 0, 1]}
        options={{ restitution: 1 }}
      />
    </>
  );
}

export default Level11;
