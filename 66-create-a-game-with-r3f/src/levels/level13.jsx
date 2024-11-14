import React from 'react';
import { Platform } from '../constructors/Blocks';

function Level13() {
  return (
    <>
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
      <Platform
        type={'bounce'}
        position={[2, 0, 3]}
        options={{ amplitude: 1, speed: 5, seed: Math.random() * 3 }}
      />
      <Platform type={'spinner'} position={[3, 0, 3]} />
      <Platform type={'spinner'} position={[3, 0, 3]} />
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
      <Platform type={'speed'} position={[1, 0, 4]} />
      <Platform type={'floor'} position={[2, 0, 4]} />
      <Platform type={'spinner'} position={[-3, 0, 4]} />
      <Platform type={'spinner'} position={[-3, 0, 4]} />
      {/*       row 4
       */}
      <Platform type={'floor'} position={[-3, 0, 2]} />
      <Platform type={'floor'} position={[-2, 0, 2]} />
      <Platform type={'floor'} position={[-1, 0, 2]} />
      <Platform type={'floor'} position={[0, 0, 2]} />
      <Platform type={'floor'} position={[1, 0, 2]} />
      <Platform type={'floor'} position={[2, 0, 2]} />
      <Platform type={'floor'} position={[3, 0, 2]} />
      <Platform type={'end'} position={[0, 0, 10]} />
    </>
  );
}

export default Level13;
