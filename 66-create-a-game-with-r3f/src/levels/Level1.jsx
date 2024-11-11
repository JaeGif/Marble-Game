import React from 'react';
import { Platform } from '../constructors/Blocks';

function Level1() {
  return (
    <>
      <Platform type={'start'} position={[0, 0, 0]} />
      <Platform type={'end'} position={[0, 0, -4]} />
    </>
  );
}

export default Level1;
