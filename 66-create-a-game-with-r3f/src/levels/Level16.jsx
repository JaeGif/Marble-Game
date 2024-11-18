import React from 'react';
import { Platform } from '../constructors/Blocks';
import FollowSpot from '../lights/FollowSpot';
import Camera from '../interactables/Camera';

function Level16() {
  return (
    <>
      <color args={['#000']} attach='background' />
      <FollowSpot />
      <Camera modality='birdseye' />
      <Platform
        type={'start'}
        position={[0, 0, 0]}
        textRotation={[-Math.PI / 2, 0, 0]}
      />
      <Platform type={'floor'} position={[0, 0, 1]} />
      <Platform type={'floor'} position={[-1, 0, 2]} />
      <Platform
        type={'limbo'}
        rotation={[0, Math.PI / 2, 0]}
        position={[-2, 0, 2]}
      />
      <Platform type={'floor'} position={[-2, 0, 3]} />
      <Platform type={'speed'} position={[-3, 0, 4]} />
      <Platform
        type={'axe'}
        rotation={[0, Math.PI / 2, 0]}
        position={[-3, 0, 5]}
      />
      <Platform
        type={'axe'}
        rotation={[0, -Math.PI / 4, 0]}
        position={[-4, 0, 6]}
      />
      <Platform
        type={'axe'}
        rotation={[0, Math.PI / 2, 0]}
        position={[-4, 0, 7]}
      />

      <Platform type={'spinner'} position={[-3, 0, 8]} />
      <Platform type={'floor'} position={[-4, 0, 8]} />
      <Platform type={'floor'} position={[-3, 0, 9]} />
      <Platform type={'blueHealth'} position={[-3, 0, 10]} />
      <Platform type={'floor'} position={[-3, 0, 6]} />

      <Platform type={'axe'} position={[0, 0, 2]} />
      <Platform type={'spinner'} position={[1, 0, 2]} />
      <Platform type={'floor'} position={[1, 0, 3]} />

      <Platform
        type={'end'}
        position={[1, 0, 5]}
        textRotation={[-Math.PI / 2, 0, 0]}
        options={{ floor: 'floor', textSize: 's' }}
      />
    </>
  );
}

export default Level16;
