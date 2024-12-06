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
        type={'floor'}
        position={[0.5, -0.15, 0]}
        rotation={[0, 0, Math.PI / 2]}
        scale={{ x: 0.3, y: 1, z: 1 }}
      />
      <Platform
        type={'floor'}
        position={[-0.5, -0.15, 0]}
        rotation={[0, 0, Math.PI / 2]}
        scale={{ x: 0.3, y: 1, z: 1 }}
      />
      <Platform
        type={'floor'}
        position={[0.5, -0.15, -1]}
        rotation={[0, 0, Math.PI / 2]}
        scale={{ x: 0.3, y: 1, z: 1 }}
      />
      <Platform
        type={'floor'}
        position={[-0.5, -0.15, -1]}
        rotation={[0, 0, Math.PI / 2]}
        scale={{ x: 0.3, y: 1, z: 1 }}
      />
      <Platform type={'floor'} position={[0, 0, -1]} />
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
          [8, 0.1, 8],
          [0, 1.5, 5.55],
        ]}
        options={{ floor: 'floor', endGatePosition: [0, 1.3, 5.55] }}
      />
      <Platform
        type={'switch'}
        scale={{ x: 1, y: 3, z: 1 }}
        position={[
          [-7, 1.25, 3],
          [0, 1.5, 5.85],
        ]}
        options={{ floor: 'floor', endGatePosition: [0, 0.9, 6.15] }}
      />
      <Platform
        type={'switch'}
        scale={{ x: 1, y: 3, z: 1 }}
        position={[
          [3, 2.05, 9],
          [0, 1.5, 6],
        ]}
        options={{ floor: 'floor', endGatePosition: [0, 0.7, 6.45] }}
      />
      <Platform
        type={'switch'}
        scale={{ x: 1, y: 3, z: 1 }}
        position={[
          [0, 0.15, 0],
          [0, 1.5, 6.15],
        ]}
        rotation={[
          [Math.PI, 0, 0],
          [Math.PI / 2, 0, 0],
        ]}
        options={{ floor: 'floor', endGatePosition: [0, 0.5, 6.75] }}
      />
      <Platform type={'flipGravity'} position={[-2, 0, 2]} />
      <Platform type={'flipGravity'} position={[-2, -1.8, 4]} />
      <Platform type={'floor'} position={[-2, -1, 4]} />
      <Platform type={'floor'} position={[-2, -1.8, 3]} />
      <Platform type={'floor'} position={[-2, -1.8, 2]} />
      <Platform type={'floor'} position={[-2, -1.8, 1]} />
      <Platform
        type={'speed'}
        position={[-2, -1, 2]}
        rotation={[Math.PI, 0, 0]}
      />
      <Platform
        type={'switch'}
        scale={{ x: 1, y: 3, z: 1 }}
        position={[
          [-2, -1.05, 1],
          [0, 1.5, 5.7],
        ]}
        options={{ floor: 'floor', endGatePosition: [0, 1.1, 5.85] }}
      />
      <Platform type={'floor'} position={[-2, -1, 0]} />
      <Platform
        type={'speed'}
        position={[-2, -0.5, -0.5]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <Platform
        type={'speed'}
        position={[-2, 0.5, -0.5]}
        rotation={[-Math.PI / 2, 0, 0]}
      />{' '}
      <Platform type={'floor'} position={[0, 0.05, -1]} />
      <Platform type={'floor'} position={[0, 0.1, -1]} />
      <Platform type={'flipGravity'} position={[0, 0.15, -1]} />
      <Platform type={'floor'} position={[0, 1, -1]} />
      <Platform type={'floor'} position={[0, 1, 0]} />
      <Platform type={'floor'} position={[0, 1, 1]} />
      <Platform type={'floor'} position={[0, 1, 2]} />
      <Platform
        type={'floor'}
        position={[0.5, 0.85, 1]}
        rotation={[0, 0, Math.PI / 2]}
        scale={{ x: 0.3, y: 1, z: 1 }}
      />
      <Platform
        type={'floor'}
        position={[-0.5, 0.85, 1]}
        rotation={[0, 0, Math.PI / 2]}
        scale={{ x: 0.3, y: 1, z: 1 }}
      />
      <Platform
        type={'floor'}
        position={[0.5, 0.85, 0]}
        rotation={[0, 0, Math.PI / 2]}
        scale={{ x: 0.3, y: 1, z: 1 }}
      />
      <Platform
        type={'floor'}
        position={[-0.5, 0.85, 0]}
        rotation={[0, 0, Math.PI / 2]}
        scale={{ x: 0.3, y: 1, z: 1 }}
      />
      <Platform
        type={'floor'}
        position={[0.5, 0.85, -1]}
        rotation={[0, 0, Math.PI / 2]}
        scale={{ x: 0.3, y: 1, z: 1 }}
      />
      <Platform
        type={'floor'}
        position={[-0.5, 0.85, -1]}
        rotation={[0, 0, Math.PI / 2]}
        scale={{ x: 0.3, y: 1, z: 1 }}
      />
      <Platform
        type={'axe'}
        position={[-2, 0.5, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        options={{ floor: 'none' }}
        scale={{ x: 3, y: 1.5, z: 1 }}
      />
      <Platform
        type={'flipGravity'}
        position={[-2, 1, 0]}
        options={{ floor: 'none' }}
      />
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
      <Platform type={'floor'} position={[5, 2, 3]} />
      <Platform type={'axe'} position={[4, 2, 8]} />
      <Platform
        type={'speed'}
        position={[4, 2, 7]}
        rotation={[0, Math.PI, 0]}
      />
      <Platform
        type={'speed'}
        position={[4, 2, 6]}
        rotation={[0, Math.PI, 0]}
      />
      <Platform type={'axe'} position={[4, 2, 5]} />
      <Platform type={'floor'} position={[4, 2, 4]} />
      <Platform
        type={'speed'}
        position={[4, 2, 3]}
        rotation={[0, -Math.PI / 2, 0]}
      />
      <Platform
        type={'passThrough'}
        position={[0.5, 2, 3]}
        scale={{ x: 6, y: 0.5, z: 0.5 }}
      />
      <Platform type={'floor'} position={[-3, 2, 3]} />
      <Platform type={'floor'} position={[-4, 2, 3]} />
      <Platform type={'floor'} position={[-5, 2, 3]} />
      <Platform
        type={'axe'}
        position={[-5, 2, 2.8]}
        rotation={[Math.PI / 2, 0, 0]}
        options={{ floor: 'none' }}
      />
      <Platform
        type={'axe'}
        position={[-5, 1.8, 3.1]}
        rotation={[Math.PI / 2, 0, 0]}
        options={{ floor: 'none' }}
      />
      <Platform
        type={'portal'}
        position={[
          [-8, 1.2, 3],
          [0, -1, -1],
        ]}
        rotation={[
          [0, Math.PI / 2, 0],
          [0, 0, 0],
        ]}
      />
      <Platform
        type={'blueHealth'}
        position={[-9, 1.2, 3]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <Platform type={'floor'} position={[-6, 1.3, 3]} />
      <Platform
        type={'portal'}
        position={[
          [0, 0, 3],
          [7, 0, 3],
        ]}
        rotation={[
          [0, 0, 0],
          [0, -Math.PI / 2, 0],
        ]}
        options={{ floor: 'none' }}
      />
      <Platform type={'floor'} position={[7, 0, 3]} />
      <Platform type={'floor'} position={[8, 0, 3]} />
      <Platform type={'axe'} position={[8, 0, 4]} />
      <Platform type={'floor'} position={[8, 0, 5]} />
      <Platform type={'roundabout'} position={[8, 0, 6]} />
      <Platform
        type={'gravity'}
        position={[8, 0, 6]}
        gravitationalConstant={-5}
        options={{ floor: 'none' }}
      />
      <Platform
        type={'spinner'}
        position={[8, 0, 6]}
        scale={{ x: 2.25, y: 1, z: 1 }}
        options={{ floor: 'none' }}
      />
      <Platform
        type={'axe'}
        position={[8, 0.2, 9]}
        scale={{ x: 2, y: 2, z: 1 }}
        rotation={[Math.PI / 2, 0, 0]}
        options={{ floor: 'none' }}
      />
      <Platform
        type={'axe'}
        position={[7, 0.2, 10]}
        scale={{ x: 2, y: 2, z: 1 }}
        rotation={[Math.PI / 2, 0, 0]}
        options={{ floor: 'none' }}
      />
      <Platform
        type={'axe'}
        position={[6, 0.2, 10]}
        scale={{ x: 2, y: 2, z: 1 }}
        rotation={[Math.PI / 2, 0, 0]}
        options={{ floor: 'none' }}
      />
      <Platform type={'end'} position={[0, -0.2, 10]} />
    </>
  );
}

export default Level30;
