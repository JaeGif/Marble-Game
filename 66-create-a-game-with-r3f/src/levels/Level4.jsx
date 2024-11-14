import React from 'react';
import { Platform } from '../constructors/Blocks';
import Lights from '../Lights';
function Level4() {
  return (
    <>
      <color args={['#bdedfc']} attach='background' />
      <Lights />

      <Platform type={'start'} position={[0, 0, 0]} />
      <Platform type={'speed'} position={[0, 0, 1]} />
      <Platform type={'axe'} position={[0, 0, 2]} />
      <Platform type={'axe'} position={[0, 0, 3]} />
      <Platform type={'floor'} position={[0, 0, 4]} />
      <Platform type={'end'} position={[0, 0, 5]} />
    </>
  );
}

export default Level4;
