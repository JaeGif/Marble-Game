import React from 'react';
import { Platform } from '../constructors/Blocks';
import Camera from '../interactables/Camera';
import Lights from '../lights/Lights';

function Level24() {
  return (
    <>
      <color args={['#bdedfc']} attach='background' />
      <Lights />
      <Camera modality='locked' />
      <Platform type={'start'} position={[0, 0, 0]} />
      <Platform type={'roundabout'} position={[0, 0, 2.25]} />
      <Platform
        type={'gravity'}
        position={[0, 0.25, 2.25]}
        gravitationalConstant={-10}
        maxDistance={5}
        options={{ floor: 'none' }}
      />
      <Platform type={'axe'} position={[0, 0, 1]} />
      <Platform type={'roundabout'} position={[-1.75, 0, 3.75]} />
      <Platform
        type={'limbo'}
        position={[-0.575, 0, 1.75]}
        rotation={[0, -Math.PI / 5, 0]}
        options={{ floor: 'none' }}
        scale={{ x: 0.5, y: 1, z: 0.5 }}
      />
      <Platform
        type={'gravity'}
        position={[-1.75, 0.25, 3.75]}
        gravitationalConstant={10}
        maxDistance={5}
        options={{ floor: 'none' }}
      />
      <Platform
        type={'floor'}
        position={[-0.99, -0.25, 3.75]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={{ x: 0.48, y: 1, z: 0.5 }}
      />
      <Platform
        type={'floor'}
        position={[-1, 0, 3]}
        rotation={[0, Math.PI / 4, 0]}
      />
      <Platform
        type={'spinner'}
        position={[-2.5, 0.04, 3.75]}
        rotation={[0, -Math.PI / 5, 0]}
        options={{ floor: 'none' }}
        scale={{ x: 0.5, y: 0.75, z: 0.75 }}
      />
      <Platform
        type={'floor'}
        position={[-(3.525 / 2), 0, 5]}
        rotation={[0, 0, 0]}
      />
      <Platform
        type={'floor'}
        position={[-(3.525 / 2), 0, 7]}
        rotation={[0, 0, 0]}
      />
      <Platform
        type={'floor'}
        position={[-(3.525 / 2) + 1, 0, 7]}
        rotation={[0, 0, 0]}
      />
      <Platform
        type={'axe'}
        position={[-(3.525 / 2) + 2, 0, 6.5]}
        rotation={[0, 0, 0]}
        options={{ floor: 'none' }}
        scale={{ x: 8, y: 1, z: 1 }}
      />
      <Platform
        type={'axe'}
        position={[-(3.525 / 2) + 2, 0, 7]}
        rotation={[0, 0, 0]}
        options={{ floor: 'none' }}
        scale={{ x: 4, y: 1, z: 1 }}
      />
      <Platform
        type={'axe'}
        position={[-(3.525 / 2) + 2, 0, 7.5]}
        rotation={[0, 0, 0]}
        options={{ floor: 'none' }}
        scale={{ x: 9, y: 1, z: 1 }}
      />
      <Platform
        type={'axe'}
        position={[-(3.525 / 2) + 1, 0, 7]}
        rotation={[0, 0, 0]}
        options={{ floor: 'none' }}
        scale={{ x: 0.2, y: 1, z: 1 }}
      />{' '}
      <Platform
        type={'spinner'}
        position={[-(3.525 / 2) + 0, 0, 7]}
        rotation={[0, 0, 0]}
        options={{ floor: 'none' }}
        scale={{ x: 1, y: 1, z: 1 }}
      />
      <Platform
        type={'floor'}
        position={[-(3.525 / 2) + 2, 0, 7]}
        rotation={[0, 0, 0]}
      />
      <Platform
        type={'floor'}
        position={[-(3.525 / 2) + 3, 0, 7]}
        rotation={[0, 0, 0]}
      />
      <Platform
        type={'floor'}
        position={[-(3.525 / 2) + 4, 0, 7]}
        rotation={[0, 0, 0]}
      />
      <Platform type={'end'} position={[-(3.525 / 2) + 4, 0, 8]} />
    </>
  );
}

export default Level24;
