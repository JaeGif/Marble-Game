import React, { useRef, useState, useMemo, useEffect } from 'react';

import Level1 from './levels/Level1';

function Level({ level = 1 }) {
  const levelMap = {
    1: Level1,
  };
  const CurrentStage = levelMap[level];
  return (
    <>
      <CurrentStage />
    </>
  );
}

export default Level;
