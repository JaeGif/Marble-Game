import React from 'react';

import Level1 from './levels/Level1';
import Level2 from './levels/Level2';
import Level3 from './levels/Level3';
import Level4 from './levels/Level4';
import Level5 from './levels/Level5';
import Level6 from './levels/Level6';
import Level7 from './levels/Level7';
import Level8 from './levels/Level8';
import Level9 from './levels/Level9';
import Level10 from './levels/Level10';
import Level11 from './levels/Level11';
import Level12 from './levels/Level12';
import Level13 from './levels/Level13';
import Level14 from './levels/Level14';
import Level15 from './levels/Level15';
import Level16 from './levels/Level16';
import Level17 from './levels/Level17';
import Level18 from './levels/Level18';
import Level19 from './levels/Level19';
import Level20 from './levels/Level20';
import Level21 from './levels/Level21';
import Level22 from './levels/Level22';
import Level23 from './levels/Level23';
import Level24 from './levels/Level24';
import Level25 from './levels/Level25';
import Level26 from './levels/Level26';
import Level27 from './levels/Level27';
import Level28 from './levels/Level28';
import Level29 from './levels/Level29';
import Level30 from './levels/Level30';

function Level({ level = 1 }) {
  const levelMap = {
    1: Level1,
    2: Level2,
    3: Level3,
    4: Level4,
    5: Level5,
    6: Level6,
    7: Level7,
    8: Level8,
    9: Level9,
    10: Level10,
    11: Level11,
    12: Level12,
    13: Level13,
    14: Level14,
    15: Level15,
    16: Level16,
    17: Level17,
    18: Level18,
    19: Level19,
    20: Level20,
    21: Level21,
    22: Level22,
    23: Level23,
    24: Level24,
    25: Level25,
    26: Level26,
    27: Level27,
    28: Level28,
    29: Level29,
    30: Level30,
  };
  const CurrentStage = levelMap[level];
  return (
    <>
      <CurrentStage />
    </>
  );
}

export default Level;
