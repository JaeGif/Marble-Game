import React from 'react';
import { Platform } from '../constructors/Blocks';

function Level2() {
  return (
    <>
      <Platform type={'start'} position={[0, 0, 0]} />
      <Platform type={'axe'} position={[0, 0, 1]} />
      <Platform type={'floor'} position={[0, 0, 2]} />
      <Platform type={'spinner'} position={[0, 0, 3]} />
      <Platform type={'end'} position={[0, 0, 4]} />
    </>
  );
}

export default Level2;
