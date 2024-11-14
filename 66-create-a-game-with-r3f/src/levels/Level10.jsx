import React from 'react';
import { Platform } from '../constructors/Blocks';

function Level10() {
  return (
    <>
      // lower level
      <Platform type={'start'} position={[0, 0, 0]} />
      <Platform
        type={'bounce'}
        position={[0, 0, 1]}
        options={{ amplitude: 1, speed: 5, seed: Math.random() * 3 }}
      />
      <Platform type={'floor'} position={[0, -2, 2]} />
      <Platform
        type={'bounce'}
        position={[0, -2, 3]}
        options={{ amplitude: 1, speed: 5, seed: Math.random() * 3 }}
      />
      <Platform type={'floor'} position={[0, -4, 4]} />
      <Platform
        type={'bounce'}
        position={[0, -4, 5]}
        options={{ amplitude: 1, speed: 5, seed: Math.random() * 3 }}
      />
      <Platform type={'end'} position={[0, -3, 10]} />
    </>
  );
}

export default Level10;
