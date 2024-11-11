import React, { useRef, useState, useMemo, useEffect } from 'react';

import Level1 from './levels/Level1';
import Level2 from './levels/Level2';
import Level3 from './levels/Level3';
import Level4 from './levels/Level4';

function Level({ level = 1 }) {
  const levelMap = {
    1: Level1,
    2: Level2,
    3: Level3,
    4: Level4,
    //    5: Level5,
    //    6: Level6,
    //    7: Level7,
    //    8: Level8,
    //    9: Level9,
    //    10: Level10,
  };
  const CurrentStage = levelMap[level];
  return (
    <>
      <CurrentStage />
    </>
  );
}

export default Level;
