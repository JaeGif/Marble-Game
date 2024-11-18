import React from 'react';
import { Platform } from '../constructors/Blocks';
import FollowSpot from '../lights/FollowSpot';
import Camera from '../interactables/Camera';
import Lights from '../lights/Lights';

function Level19() {
  return (
    <>
      <color args={['#bdedfc']} attach='background' />
      <Lights />
      <Camera debug modality='birdseye' />
      <Platform
        type={'start'}
        position={[0, 0, 0]}
        textRotation={[-Math.PI / 2, 0, 0]}
      />
      // floor
      <Platform type={'speed'} position={[0, 0, 1]} />
      <Platform type={'floor'} position={[4, 0, 1]} />
      <Platform type={'spinner'} position={[5, 0, 1]} />
      <Platform
        type={'spinner'}
        position={[5, 0, 1]}
        options={{ floor: 'none' }}
      />
      <Platform type={'speed'} position={[6, 0, 1]} />
      <Platform type={'speed'} position={[0, 0, 2]} />
      <Platform type={'floor'} position={[2, 0, 2]} />
      <Platform type={'speed'} position={[3, 0, 2]} />
      <Platform type={'spinner'} position={[4, 0, 2]} />
      <Platform
        type={'spinner'}
        position={[4, 0, 2]}
        options={{ floor: 'none' }}
      />
      <Platform type={'speed'} position={[5, 0, 2]} />
      <Platform type={'speed'} position={[0, 0, 3]} />
      <Platform type={'speed'} position={[2, 0, 3]} />
      <Platform type={'spinner'} position={[3, 0, 3]} />
      <Platform
        type={'spinner'}
        position={[3, 0, 3]}
        options={{ floor: 'none' }}
      />
      <Platform type={'floor'} position={[5, 0, 3]} />
      <Platform type={'speed'} position={[6, 0, 3]} />
      <Platform type={'speed'} position={[0, 0, 4]} />
      <Platform type={'spinner'} position={[2, 0, 4]} />
      <Platform
        type={'spinner'}
        options={{ floor: 'none' }}
        position={[2, 0, 4]}
      />
      <Platform type={'floor'} position={[3, 0, 4]} />
      <Platform type={'speed'} position={[4, 0, 4]} />
      <Platform type={'spinner'} position={[6, 0, 4]} />
      <Platform
        type={'spinner'}
        options={{ floor: 'none' }}
        position={[6, 0, 4]}
      />
      <Platform type={'floor'} position={[0, 0, 5]} />
      <Platform type={'floor'} position={[1, 0, 5]} />
      <Platform type={'floor'} position={[2, 0, 5]} />
      <Platform type={'speed'} position={[3, 0, 5]} />
      <Platform type={'floor'} position={[5, 0, 5]} />
      <Platform type={'floor'} position={[0, 0, 6]} />
      <Platform type={'floor'} position={[0, 0, 7]} />
      <Platform type={'floor'} position={[1, 0, 7]} />
      <Platform type={'spinner'} position={[2, 0, 7]} />
      <Platform
        type={'spinner'}
        options={{ floor: 'none' }}
        position={[2, 0, 7]}
      />
      <Platform type={'floor'} position={[3, 0, 7]} />
      <Platform type={'floor'} position={[4, 0, 7]} />
      <Platform type={'blueHealth'} position={[6, 0, 7]} />
      // walls
      <Platform
        type={'floor'}
        position={[-0.5, -0.5, 0]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <Platform
        type={'floor'}
        position={[0.5, -0.5, 0]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <Platform
        type={'speed'}
        position={[-0.5, -0.5, 1]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <Platform
        type={'speed'}
        position={[-0.5, -0.5, 2]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <Platform
        type={'speed'}
        position={[-0.5, -0.5, 3]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <Platform
        type={'speed'}
        position={[-0.5, -0.5, 4]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <Platform
        type={'speed'}
        position={[0.5, -0.5, 1]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <Platform
        type={'speed'}
        position={[0.5, -0.5, 2]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <Platform
        type={'speed'}
        position={[0.5, -0.5, 3]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <Platform
        type={'speed'}
        position={[0.5, -0.5, 4]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <Platform
        type={'bounce'}
        position={[-0.3, -0.5, 4.85]}
        rotation={[0, Math.PI / 5, Math.PI / 2]}
        options={{ amplitude: 1, speed: 5, seed: Math.random() * 3 }}
      />
      <Platform
        type={'floor'}
        position={[0, -0.5, 7.5]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <Platform
        type={'floor'}
        position={[1, -0.5, 7.5]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <Platform
        type={'floor'}
        position={[2, -0.5, 7.5]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <Platform
        type={'floor'}
        position={[3, -0.5, 7.5]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <Platform
        type={'floor'}
        position={[4, -0.5, 7.5]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <Platform
        type={'floor'}
        position={[5, -0.5, 7.5]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <Platform
        type={'floor'}
        position={[6, -0.5, 6.5]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <Platform
        type={'floor'}
        position={[5, -0.5, 6.5]}
        rotation={[Math.PI / 2, 0, 0]}
      />{' '}
      <Platform
        type={'floor'}
        position={[4, -0.5, 6.5]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <Platform
        type={'floor'}
        position={[3, -0.5, 6.5]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <Platform
        type={'floor'}
        position={[2, -0.5, 6.5]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <Platform
        type={'floor'}
        position={[1, -0.5, 6.5]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <Platform
        type={'floor'}
        position={[0.5, -0.5, 6]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <Platform
        type={'floor'}
        position={[0.5, -0.5, 0]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <Platform type={'speed'} position={[1, 0, 0]} />
      <Platform type={'speed'} position={[3, 0, 0]} />
      <Platform type={'spinner'} position={[2, 0, 0]} />
      <Platform
        type={'spinner'}
        options={{ floor: 'none' }}
        position={[2, 0, 0]}
      />
      <Platform type={'spinner'} position={[2, 0, -1]} />
      <Platform
        type={'spinner'}
        options={{ floor: 'none' }}
        position={[2, 0, 0 - 1]}
      />
      <Platform
        type={'speed'}
        position={[2, 0, -2]}
        rotation={[0, Math.PI, 0]}
      />
      <Platform type={'floor'} position={[3, 0, -3]} />
      <Platform
        type={'end'}
        position={[3, 0, -4]}
        textRotation={[-Math.PI / 2, 0, 0]}
        options={{ floor: 'floor', textSize: 'm' }}
      />
    </>
  );
}

export default Level19;
