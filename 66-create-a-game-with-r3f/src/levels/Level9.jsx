import React from 'react';
import { Platform } from '../constructors/Blocks';
import Lights from '../Lights';
function Level9() {
  return (
    <>
      <color args={['#bdedfc']} attach='background' />
      <Lights />

      <Platform type={'start'} position={[0, 0, 0]} />
      <Platform type={'floor'} position={[0, 0, 1]} />

      <Platform
        type={'portal'}
        position={[
          [0, 0, 2],
          [0, -5, 4],
        ]}
      />
      <Platform type={'floor'} position={[0, 0, 5]} />
      <Platform type={'floor'} position={[1, 0, 5]} />
      <Platform type={'floor'} position={[-1, 0, 5]} />

      <Platform type={'floor'} position={[1, 0, 6]} />
      <Platform type={'floor'} position={[-1, 0, 6]} />
      <Platform type={'end'} position={[0, 0, 6]} />

      <Platform type={'floor'} position={[0, 0, 7]} />
      <Platform type={'floor'} position={[1, 0, 7]} />
      <Platform type={'floor'} position={[-1, 0, 7]} />
    </>
  );
}

export default Level9;
