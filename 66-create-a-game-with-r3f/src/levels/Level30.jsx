import React from 'react';
import { Platform } from '../constructors/Blocks';
import Camera from '../interactables/Camera';
import Lights from '../lights/Lights';

function Level30() {
  return (
    <>
      <color args={['#bdedfc']} attach='background' />
      <Lights />
      <Camera modality='locked' />
      <Platform type={'start'} position={[0, 0, 0]} />
      <Platform
        type={'passThrough'}
        position={[0, 0.375, 2]}
        scale={{ x: 1.1, y: 0.75, z: 1.1 }}
      />
      <Platform type={'floor'} position={[0, 1, 2]} />
      <Platform type={'roundabout'} position={[0, 0, 2]} />
      <Platform type={'speed'} position={[0, 1, 3]} />
      <Platform
        type={'passThrough'}
        position={[0, 1, 4]}
        scale={{ x: 1, y: 0.5, z: 1 }}
      />
      <Platform type={'floor'} position={[0, 1, 5]} />
      <Platform
        type={'switch'}
        scale={{ x: 1, y: 3, z: 1 }}
        position={[
          [-5, 1, 3],
          [0, 1.5, 5.55],
        ]}
        options={{ floor: 'floor', endGatePosition: [0, 1.3, 5.55] }}
      />
      <Platform
        type={'switch'}
        scale={{ x: 1, y: 3, z: 1 }}
        position={[
          [-4, 1, 3],
          [0, 1.5, 5.7],
        ]}
        options={{ floor: 'floor', endGatePosition: [0, 1.1, 5.85] }}
      />
      <Platform
        type={'switch'}
        scale={{ x: 1, y: 3, z: 1 }}
        position={[
          [-3, 1, 3],
          [0, 1.5, 5.85],
        ]}
        options={{ floor: 'floor', endGatePosition: [0, 0.9, 6.15] }}
      />
      <Platform
        type={'switch'}
        scale={{ x: 1, y: 3, z: 1 }}
        position={[
          [-2, 1, 3],
          [0, 1.5, 6],
        ]}
        options={{ floor: 'floor', endGatePosition: [0, 0.7, 6.45] }}
      />
      <Platform
        type={'switch'}
        scale={{ x: 1, y: 3, z: 1 }}
        position={[
          [-1, 1, 3],
          [0, 1.5, 6.15],
        ]}
        options={{ floor: 'floor', endGatePosition: [0, 0.5, 6.75] }}
      />{' '}
      <Platform
        type={'floor'}
        position={[0, 0.75, 9.5]}
        rotation={[0, Math.PI / 2, Math.PI / 2]}
        scale={{ x: 0.5, y: 1, z: 1 }}
      />
      <Platform type={'floor'} position={[0, -0.2, 8]} />
      <Platform type={'blueHealth'} position={[0, 1, 9]} />
      <Platform type={'spinner'} position={[1, 1, 9]} />
      <Platform
        type={'spinner'}
        position={[1, 1, 9]}
        options={{ floor: 'none' }}
      />
      <Platform type={'floor'} position={[4, 2, 9]} />
      <Platform type={'axe'} position={[4, 2, 8]} />
      <Platform
        type={'speed'}
        position={[4, 2, 7]}
        rotation={[0, Math.PI, 0]}
      />
      <Platform type={'floor'} position={[3, 1, 9]} />
      <Platform type={'end'} position={[0, -0.2, 10]} />
    </>
  );
}

export default Level30;
