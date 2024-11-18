import React from 'react';
import { Platform } from '../constructors/Blocks';
import Lights from '../lights/Lights';
import Camera from '../interactables/Camera';

function Level11() {
  return (
    <>
      <color args={['#bdedfc']} attach='background' />
      <Lights />
      <Camera modality='locked' />
      // lower level
      <Platform type={'start'} position={[0, 0, 0]} />
      <Platform type={'speed'} position={[0, 0, 1]} />
      <Platform type={'speed'} position={[0, 0, 2]} />
      <Platform type={'axe'} position={[0, 0, 3]} />
      <Platform type={'speed'} position={[0, 0, 4]} />
      // hard to access health
      <Platform type={'blueHealth'} position={[1, 0, 10]} />
      <Platform type={'blueHealth'} position={[-1, 0, 10]} />
      // middle platform
      <Platform type={'floor'} position={[-0.5, 0, 14]} />
      <Platform type={'floor'} position={[0.5, 0, 14]} />
      <Platform type={'floor'} position={[-0.5, 0, 15]} />
      <Platform type={'floor'} position={[0.5, 0, 15]} />
      <Platform type={'floor'} position={[0, 0, 16]} />
      <Platform type={'limbo'} position={[0, 0, 17]} />
      <Platform type={'limbo'} position={[0, 0, 17]} />
      <Platform type={'spinner'} position={[0, 0, 18]} />
      <Platform type={'spinner'} position={[-0.5, 0, 19]} />
      <Platform type={'spinner'} position={[0.5, 0, 19]} />
      <Platform type={'floor'} position={[0, 0, 20]} />
      <Platform type={'axe'} position={[0, 0, 21]} />
      <Platform type={'axe'} position={[0, 0, 21]} />
      <Platform type={'floor'} position={[0, 0, 22]} />
      <Platform type={'speed'} position={[0, 0, 23]} />
      <Platform type={'speed'} position={[0, 0, 24]} />
      <Platform type={'speed'} position={[0, 0, 25]} />
      <Platform type={'speed'} position={[0, 0, 26]} />
      <Platform type={'speed'} position={[0, 0, 27]} />
      <Platform type={'speed'} position={[0, 0, 28]} />
      <Platform type={'floor'} position={[0, 0, 29]} />
      <Platform type={'limbo'} position={[0, 0, 30]} />
      // under floor portal
      <Platform type={'floor'} position={[0, 2, 15]} />
      <Platform type={'floor'} position={[0, 2, 14]} />
      <Platform type={'floor'} position={[0, 2, 13]} />
      <Platform
        type={'portal'}
        position={[
          [0, 2, 16],
          [0, -5, 0],
        ]}
      />
      // upper level
      <Platform type={'floor'} position={[0, -5, 1]} />
      <Platform type={'floor'} position={[0, -5, 2]} />
      <Platform type={'floor'} position={[0, -5, 3]} />
      <Platform type={'floor'} position={[0, -5, 4]} />
      <Platform type={'floor'} position={[0, -5, 5]} />
      <Platform type={'axe'} position={[0, 1, 49]} />
      <Platform type={'floor'} position={[0, 1, 48]} />
      <Platform type={'floor'} position={[0, 1, 47]} />
      <Platform type={'floor'} position={[0, 1, 46]} />
      <Platform type={'floor'} position={[0, 1, 45]} />
      <Platform type={'floor'} position={[0, 1, 44]} />
      <Platform type={'floor'} position={[0, 1, 43]} />
      <Platform type={'end'} position={[0, 1, 50]} />
      <Platform type={'floor'} position={[-1, 1, 50]} />
      <Platform type={'floor'} position={[1, 1, 50]} />
      <Platform type={'floor'} position={[0, 1, 51]} />
      <Platform type={'floor'} position={[1, 1, 51]} />
      <Platform type={'floor'} position={[-1, 1, 51]} />
    </>
  );
}

export default Level11;
