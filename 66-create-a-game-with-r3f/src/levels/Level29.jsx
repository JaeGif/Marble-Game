import React from 'react';
import { Platform } from '../constructors/Blocks';
import Camera from '../interactables/Camera';
import Lights from '../lights/Lights';

function Level29() {
  return (
    <>
      <color args={['#bdedfc']} attach='background' />
      <Lights />
      <Camera modality='locked' />
      <Platform type={'start'} position={[0, 0, 0]} />
      <Platform type={'spinner'} position={[1, 0, 0]} />
      <Platform type={'limbo'} position={[2, 0, 0]} />
      <Platform
        type={'axe'}
        position={[3, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <Platform
        type={'switch'}
        position={[
          [-2, 0, 1],
          [0, -0.5, 2.4],
        ]}
        options={{ floor: 'floor', endGatePosition: [0, 0.6, 2.4] }}
      />
      <Platform
        type={'switch'}
        position={[
          [5, 0, 1],
          [0, -0.5, 1.4],
        ]}
        options={{ floor: 'floor', endGatePosition: [0, 0.6, 1.4] }}
      />
      <Platform
        type={'bounce'}
        position={[0, 0, -1]}
        options={{ amplitude: 1, speed: 5, seed: Math.random() * 3 }}
      />{' '}
      <Platform
        type={'bounce'}
        position={[0, 0, -5]}
        options={{ amplitude: 1, speed: 5, seed: Math.random() * 3 }}
      />{' '}
      <Platform
        type={'switch'}
        position={[
          [0, 0, -4],
          [0, -0.5, 0.4],
        ]}
        options={{ floor: 'floor', endGatePosition: [0, 0.6, 0.4] }}
      />
      <Platform
        type={'passThrough'}
        position={[0, 0, 1.5]}
        scale={{ x: 0.999, y: 1, z: 2 }}
      />
      <Platform type={'floor'} position={[0, 0, 3]} />
      <Platform type={'floor'} position={[-1, 0, 3]} />
      <Platform type={'floor'} position={[-2, 0, 3]} />
      <Platform
        type={'floor'}
        position={[-1, -0.5, 2.5]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <Platform type={'floor'} position={[3, 0, 3]} />
      <Platform
        type={'spinner'}
        position={[2, 0, 3]}
        rotation={[Math.PI, 0, 0]}
      />{' '}
      <Platform type={'floor'} position={[4, 0, 3]} />
      <Platform type={'floor'} position={[5, 0, 3]} />
      <Platform
        type={'floor'}
        position={[5, -0.5, 2.5]}
        rotation={[Math.PI / 2, 0, 0]}
      />{' '}
      <Platform
        type={'floor'}
        position={[5.5, -0.5, 3]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <Platform
        type={'floor'}
        position={[-2, -0.5, 2.5]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <Platform type={'floor'} position={[0, 1, 4]} />
      <Platform type={'flipGravity'} position={[0, 1, 3]} />
      <Platform
        type={'passThrough'}
        position={[5, 0, -2]}
        scale={{ x: 1, y: 1, z: 5 }}
      />
      <Platform type={'floor'} position={[5, 0, -5]} />
      <Platform
        type={'passThrough'}
        position={[2.5, 0, -5]}
        scale={{ x: 4, y: 1, z: 1 }}
      />
      <Platform
        type={'floor'}
        position={[-0.5, 0.5, 0]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <Platform
        type={'floor'}
        position={[0.5, 0.55, 0]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <Platform
        type={'floor'}
        position={[0, 0.55, -0.5]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <Platform
        type={'end'}
        position={[0, 0, 0]}
        options={{ floor: 'none' }}
        rotation={[Math.PI, 0, 0]}
      />
    </>
  );
}

export default Level29;
