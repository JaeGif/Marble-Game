import React from 'react';
import { Platform } from '../constructors/Blocks';

function Level13() {
  return (
    <>
      <color args={['#bdedfc']} attach='background' />
      <Platform type={'start'} position={[0, 0, 0]} />
      <Platform type={'limbo'} position={[0, 0, 1]} />
      <Platform
        type={'limbo'}
        options={{ floor: 'none' }}
        position={[0, 0, 1]}
      />
      <Platform
        type={'limbo'}
        options={{ floor: 'none' }}
        position={[0, 0, 1]}
      />
      {/*       row 1
       */}
      <Platform type={'floor'} position={[-3, 0, 2]} />
      <Platform type={'floor'} position={[-2, 0, 2]} />
      <Platform type={'floor'} position={[-1, 0, 2]} />
      <Platform type={'floor'} position={[0, 0, 2]} />
      <Platform type={'floor'} position={[1, 0, 2]} />
      <Platform type={'floor'} position={[2, 0, 2]} />
      <Platform type={'floor'} position={[3, 0, 2]} />
      {/*        row 2
       */}
      <Platform
        type={'axe'}
        position={[-3, 0, 2]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <Platform type={'limbo'} position={[-2, 0, 3]} />
      <Platform type={'limbo'} position={[-1, 0, 3]} />
      <Platform type={'speed'} position={[0, 0, 3]} />
      // empty
      <Platform
        type={'bounce'}
        position={[2, 0, 3]}
        options={{ amplitude: 0.1, speed: 5, seed: Math.random() * 3 }}
      />
      <Platform type={'spinner'} position={[3, 0, 3]} />
      <Platform
        type={'spinner'}
        options={{ floor: 'none' }}
        position={[3, 0, 3]}
      />
      {/*       row 3
       */}
      <Platform type={'floor'} position={[-3, 0, 4]} />
      <Platform
        type={'axe'}
        position={[-2, 0, 4]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <Platform type={'axe'} position={[-1, 0, 4]} />
      // empty
      <Platform type={'speed'} position={[1, 0, 4]} rotation={[0, 0, 0]} />
      <Platform
        type={'axe'}
        options={{ floor: 'speed' }}
        position={[1, -0.5, 4.45]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <Platform type={'floor'} position={[2, 0, 4]} />
      <Platform type={'spinner'} position={[-3, 0, 4]} />
      <Platform
        type={'spinner'}
        options={{ floor: 'none' }}
        position={[-3, 0, 4]}
      />
      {/*       row 4
       */}
      <Platform
        type={'bounce'}
        options={{ amplitude: 1, speed: 5, seed: Math.random() * 3 }}
        position={[-3, 0, 5]}
      />
      <Platform type={'floor'} position={[-2, 0, 5]} />
      <Platform
        type={'portal'}
        position={[
          [-1, 0, 5],
          [0, -1, -2],
        ]}
      />
      // empty // empty
      <Platform
        type={'axe'}
        position={[2, 0, 5]}
        rotation={[0, Math.PI / 2, 0]}
      />
      // empty
      <Platform
        type={'axe'}
        position={[0, 0, 7]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <Platform
        type={'axe'}
        options={{ floor: 'none' }}
        position={[0, 0, 7]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <Platform type={'floor'} position={[2, 0, 7]} />
      // Upper deck
      <Platform type={'blueHealth'} position={[1, -1, 5]} />
      <Platform
        type={'speed'}
        position={[0, -1, 5]}
        rotation={[0, -Math.PI / 2, 0]}
      />
      <Platform type={'limbo'} position={[0, -1, 6]} />
      <Platform type={'spinner'} position={[0, -1, 7]} />
      // end
      <Platform type={'end'} position={[0, 0, 10]} />
    </>
  );
}

export default Level13;
