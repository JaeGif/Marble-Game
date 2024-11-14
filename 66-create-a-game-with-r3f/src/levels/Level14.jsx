import React from 'react';
import { Platform } from '../constructors/Blocks';
import Lights from '../Lights';

function Level14() {
  return (
    <>
      <color args={['#111111']} attach='background' />
      <Lights />

      <Platform type={'start'} position={[0, 0, 0]} />
      <Platform type={'speed'} position={[0, 0, 1]} rotation={[0, 0, 0]} />

      <Platform type={'end'} position={[0, 0, 10]} />
    </>
  );
}

export default Level14;
