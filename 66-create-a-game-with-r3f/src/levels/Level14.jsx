import React from 'react';
import { Platform } from '../constructors/Blocks';
import FollowSpot from '../lights/FollowSpot';
function Level14() {
  return (
    <>
      <color args={['#000']} attach='background' />
      <FollowSpot />

      <Platform type={'start'} position={[0, 0, 0]} />
      <Platform type={'speed'} position={[0, 0, 1]} rotation={[0, 0, 0]} />

      <Platform type={'end'} position={[0, 0, 10]} />
    </>
  );
}

export default Level14;
