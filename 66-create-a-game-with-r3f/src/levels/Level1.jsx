import React from 'react';
import { Platform } from '../constructors/Blocks';
import Lights from '../Lights';
function Level1() {
  return (
    <>
      <color args={['#bdedfc']} attach='background' />
      <Lights />

      <Platform type={'start'} position={[0, 0, 0]} />
      <Platform type={'floor'} position={[0, 0, 1]} />
      <Platform type={'axe'} position={[0, 0, 2]} />
      <Platform type={'end'} position={[0, 0, 3]} />
    </>
  );
}

export default Level1;
