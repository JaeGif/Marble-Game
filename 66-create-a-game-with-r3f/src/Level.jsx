import React from 'react';

import TestZone from './constructors/TestZone';

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

export const levelMap = {
  1: { level: Level1, title: 'The Beginning', thumbnail: '' },
  2: { level: Level2, title: 'Easy Does It', thumbnail: '' },
  3: { level: Level3, title: 'Man This Game Is Easy', thumbnail: '' },
  4: { level: Level4, title: 'WHEEEE!!!', thumbnail: '' },
  5: { level: Level5, title: 'Mind The Gap', thumbnail: '' },
  6: { level: Level6, title: 'Second Dimension', thumbnail: '' },
  7: { level: Level7, title: 'Sudden Drop', thumbnail: '' },
  8: { level: Level8, title: 'Portals', thumbnail: '' },
  9: { level: Level9, title: 'Carefully Now', thumbnail: '' },
  10: { level: Level10, title: 'Boiinnngg', thumbnail: '' },
  11: { level: Level11, title: 'Full Speed Ahead', thumbnail: '' },
  12: { level: Level12, title: 'Sidescroller', thumbnail: '' },
  13: { level: Level13, title: 'Chaos', thumbnail: '' },
  14: { level: Level14, title: 'All Eyes On You', thumbnail: '' },
  15: { level: Level15, title: 'Not So Straightforward', thumbnail: '' },
  16: { level: Level16, title: 'Soul Searching', thumbnail: '' },
  17: { level: Level17, title: 'Gottem', thumbnail: '' },
  18: { level: Level18, title: 'Familiar Feeling', thumbnail: '' },
  19: { level: Level19, title: '2D Platforming', thumbnail: '' },
  20: { level: Level20, title: 'Reprieve', thumbnail: '' },
  21: { level: Level21, title: 'Third Dimension', thumbnail: '' },
  22: { level: Level22, title: 'Floating', thumbnail: '' },
  23: { level: Level23, title: 'Risk It For The Biscuit', thumbnail: '' },
  24: { level: Level24, title: 'Push And Pull', thumbnail: '' },
  25: { level: Level25, title: 'Directional Commitment', thumbnail: '' },
  26: { level: Level26, title: 'Directionally Challenged', thumbnail: '' },
  27: { level: Level27, title: 'Backtrack', thumbnail: '' },
  28: { level: Level28, title: 'Switch Up', thumbnail: '' },
  29: { level: Level29, title: 'Again and Again', thumbnail: '' },
  30: { level: Level30, title: 'One Chance', thumbnail: '' },
  //  TestZone: { level: TestZone, title: 'Test Zone', thumbnail: '' },
};

function Level({ level = 1 }) {
  const CurrentStage = levelMap[level].level;

  return (
    <>
      <CurrentStage />
    </>
  );
}

export default Level;
