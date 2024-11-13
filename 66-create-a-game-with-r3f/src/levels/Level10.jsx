import React from 'react';
import { Platform } from '../constructors/Blocks';

function Level10() {
  return (
    <>
      // lower level
      <Platform type={'start'} position={[0, 0, 0]} />
      <Platform type={'bounce'} position={[0, 0, 1]} />
      <Platform type={'floor'} position={[0, -2, 2]} />
      <Platform type={'bounce'} position={[0, -2, 3]} />
      <Platform type={'floor'} position={[0, -4, 4]} />
      <Platform type={'bounce'} position={[0, -4, 5]} />
      <Platform type={'end'} position={[0, -3, 10]} />
    </>
  );
}

export default Level10;
