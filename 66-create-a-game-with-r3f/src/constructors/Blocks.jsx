import React from 'react';

const UNIT_CONSTANT = -4;

import BlockStart from './blocks/BlockStart';
import BlockGravity from './blocks/BlockGravity';
import BlockSpinner from './blocks/BlockSpinner';
import BlockEnd from './blocks/BlockEnd';
import BlockSpeed from './blocks/BlockSpeed';
import BlockLimbo from './blocks/BlockLimbo';
import BlockPortal from './blocks/BlockPortal';
import BlockAxe from './blocks/BlockAxe';
import BlockBounce from './blocks/BlockBounce';
import BlockBlueHealth from './blocks/BlockBlueHealth';
import BlockFloor from './blocks/BlockFloor';
import BlockFlipGravity from './blocks/BlockFlipGravity';
import BlockPassThrough from './blocks/BlockPassThrough';
import BlockSwitch from './blocks/BlockSwitch';
import BlockTurret from './blocks/BlockTurret';
import BlockRoundAbout from './blocks/BlockRoundAbout';
// blocks are 4x4, -z is away from starting cam position

// platform types are block types

/**
 * Represents a Platform of specified type and position.
 * @param {string} 'start' | 'end' | 'spinner' | 'axe' | 'limbo' | 'blueHealth' | 'speed' | 'portal' | 'bounce' | 'floor'
 * @param {[number, number, number]} position [x, y, z] world coordinates
 */
export function Platform({
  type,
  position,
  rotation,
  gravitationalConstant,
  maxDistance,
  textRotation,
  scale = { x: 1, y: 1, z: 1 },
  options = { floor: 'floor', endGatePosition: [0, UNIT_CONSTANT, 0] },
}) {
  // position offset so it aligns flush when upside down
  if (rotation && Math.round(rotation[0]) === Math.round(Math.PI)) {
    position[1] += 0.05;
  }
  if (rotation && Math.round(rotation[2]) === Math.round(Math.PI)) {
    position[1] += 0.05;
  }

  const blockMap = {
    floor: BlockFloor,
    limbo: BlockLimbo,
    axe: BlockAxe,
    blueHealth: BlockBlueHealth,
    speed: BlockSpeed,
    spinner: BlockSpinner,
    portal: BlockPortal,
    bounce: BlockBounce,
    gravity: BlockGravity,
    flipGravity: BlockFlipGravity,
    roundabout: BlockRoundAbout,
    turret: BlockTurret,
    passThrough: BlockPassThrough,
    switch: BlockSwitch,
    start: BlockStart,
    end: BlockEnd,
  };
  const floorOptions = {
    floor: BlockFloor,
    speed: BlockSpeed,
    bounce: BlockBounce,
    none: null,
  };
  const Floor = floorOptions[options.floor];

  const Block = blockMap[type];

  return (
    <>
      {type === 'floor' ? (
        <BlockFloor
          position={[
            position[0] * UNIT_CONSTANT,
            position[1] * UNIT_CONSTANT,
            position[2] * UNIT_CONSTANT,
          ]}
          type={type}
          scale={scale}
          rotation={rotation}
        />
      ) : type === 'speed' ||
        type === 'bounce' ||
        type === 'flipGravity' ||
        type === 'roundabout' ||
        type === 'turret' ||
        type === 'passThrough' ? (
        <>
          <Block
            position={[
              position[0] * UNIT_CONSTANT,
              position[1] * UNIT_CONSTANT,
              position[2] * UNIT_CONSTANT,
            ]}
            rotation={rotation}
            options={options}
            scale={scale}
            gravitationalConstant={gravitationalConstant}
            maxDistance={maxDistance}
            textRotation={textRotation}
          />
        </>
      ) : type === 'portal' ? (
        <>
          {options.floor === 'none' ? (
            <></>
          ) : (
            <>
              <Floor
                position={[
                  position[0][0] * UNIT_CONSTANT,
                  position[0][1] * UNIT_CONSTANT,
                  position[0][2] * UNIT_CONSTANT,
                ]}
                scale={scale}
                rotation={
                  rotation && [rotation[0][0], rotation[0][1], rotation[0][2]]
                }
                type={type}
              />
              <Floor
                position={[
                  position[1][0] * UNIT_CONSTANT,
                  position[1][1] * UNIT_CONSTANT,
                  position[1][2] * UNIT_CONSTANT,
                ]}
                scale={scale}
                rotation={
                  rotation && [rotation[1][0], rotation[1][1], rotation[1][2]]
                }
                type={type}
              />
            </>
          )}
          <Block
            options={options}
            position={[
              [
                position[0][0] * UNIT_CONSTANT,
                position[0][1] * UNIT_CONSTANT,
                position[0][2] * UNIT_CONSTANT,
              ],
              [
                position[1][0] * UNIT_CONSTANT,
                position[1][1] * UNIT_CONSTANT,
                position[1][2] * UNIT_CONSTANT,
              ],
            ]}
            rotation={
              rotation && [
                [rotation[0][0], rotation[0][1], rotation[0][2]],
                [rotation[1][0], rotation[1][1], rotation[1][2]],
              ]
            }
            textRotation={textRotation}
            scale={scale}
          />
        </>
      ) : type === 'switch' ? (
        <>
          {options.floor === 'none' ? (
            <></>
          ) : (
            <>
              <Floor
                position={[
                  position[0][0] * UNIT_CONSTANT,
                  position[0][1] * UNIT_CONSTANT,
                  position[0][2] * UNIT_CONSTANT,
                ]}
                scale={scale}
                rotation={
                  rotation && [rotation[0][0], rotation[0][1], rotation[0][2]]
                }
                options={options}
                type={type}
              />
            </>
          )}
          <Block
            options={options}
            position={[
              [
                position[0][0] * UNIT_CONSTANT,
                position[0][1] * UNIT_CONSTANT,
                position[0][2] * UNIT_CONSTANT,
              ],
              [
                position[1][0] * UNIT_CONSTANT,
                position[1][1] * UNIT_CONSTANT,
                position[1][2] * UNIT_CONSTANT,
              ],
            ]}
            rotation={
              rotation && [
                [rotation[0][0], rotation[0][1], rotation[0][2]],
                [rotation[1][0], rotation[1][1], rotation[1][2]],
              ]
            }
            textRotation={textRotation}
            scale={scale}
          />
        </>
      ) : (
        <>
          {options.floor === 'none' ? (
            <></>
          ) : (
            <Floor
              position={[
                position[0] * UNIT_CONSTANT,
                position[1] * UNIT_CONSTANT,
                position[2] * UNIT_CONSTANT,
              ]}
              scale={scale}
              rotation={rotation}
              type={type}
            />
          )}
          <Block
            options={options}
            position={[
              position[0] * UNIT_CONSTANT,
              position[1] * UNIT_CONSTANT,
              position[2] * UNIT_CONSTANT,
            ]}
            gravitationalConstant={gravitationalConstant}
            maxDistance={maxDistance}
            rotation={rotation}
            textRotation={textRotation}
            scale={scale}
          />
        </>
      )}
    </>
  );
}
