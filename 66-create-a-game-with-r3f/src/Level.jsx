import React, { useRef, useState, useMemo, useEffect } from 'react';

import Level1 from './levels/Level1';
import Level2 from './levels/Level2';

function Level({ level = 1 }) {
  const levelMap = {
    1: Level1,
    2: Level2,
  };
  const CurrentStage = levelMap[level];
  return (
    <>
      <CurrentStage />
    </>
  );
}

export default Level;
