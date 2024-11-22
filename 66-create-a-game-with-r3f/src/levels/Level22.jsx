import React from 'react';
import { Platform } from '../constructors/Blocks';
import Camera from '../interactables/Camera';
import Lights from '../lights/Lights';

function Level22() {
  return (
    <>
      <color args={['#bdedfc']} attach='background' />
      <Lights />
      <Camera modality='locked' />
      <Platform type={'start'} position={[0, 0, 0]} />
      <Platform type={'floor'} position={[0, 0.5, 2]} />{' '}
      <Platform type={'floor'} position={[0, 0.5, 1]} />
      <Platform type={'floor'} position={[0, 0.5, 0]} />
      <Platform type={'floor'} position={[0, 0.5, -1]} />
      <Platform type={'floor'} position={[0, 0.5, -2]} />
      <Platform
        type={'speed'}
        position={[0, 0, -2]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <Platform
        type={'speed'}
        position={[0, -1, -2]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <Platform
        type={'gravity'}
        position={[0, -5, -1]}
        gravitationalConstant={7}
        maxDistance={16}
      />
      <Platform
        type={'gravity'}
        position={[0, -5, 0]}
        gravitationalConstant={6}
        maxDistance={5}
      />
      <Platform type={'floor'} position={[0, 0, -1]} />
      <Platform
        type={'floor'}
        position={[0, -0.5, -1.5]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <Platform type={'floor'} position={[0, 0.5, 0]} />
      <Platform
        type={'gravity'}
        position={[0, 0, 1]}
        gravitationalConstant={8}
        maxDistance={8}
      />
      <Platform
        type={'gravity'}
        position={[0, 0, 3]}
        gravitationalConstant={-8}
        maxDistance={5}
      />
      <Platform type={'axe'} position={[0, 0, 4]} />
      <Platform type={'end'} position={[0, 0, 5]} />
    </>
  );
}

export default Level22;
