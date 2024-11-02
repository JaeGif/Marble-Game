import React, { useRef, useEffect } from 'react';
import { useKeyboardControls } from '@react-three/drei';
import useGame from './stores/useGame';
import { addEffect } from '@react-three/fiber';
function Interface() {
  const controls = useKeyboardControls((state) => state);

  const timeRef = useRef();

  const next = useGame((state) => state.next);
  const phase = useGame((state) => state.phase);
  const level = useGame((state) => state.level);

  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();

      let elapsedTime = 0;

      if (state.phase === 'playing') elapsedTime = Date.now() - state.startTime;
      else if (state.phase === 'complete')
        elapsedTime = state.endTime - state.startTime;

      elapsedTime /= 1000;
      elapsedTime = elapsedTime.toFixed(2);

      if (timeRef.current) timeRef.current.textContent = elapsedTime;
    });

    return () => {
      unsubscribeEffect();
    };
  }, []);

  return (
    <div className='interface'>
      <div ref={timeRef} className='time'>
        0.00
      </div>
      {phase === 'complete' && (
        <div className='restart' onClick={next}>
          Next
        </div>
      )}
      {phase === 'gameOver' && (
        <div className='restart' onClick={next}>
          Add Highscore
        </div>
      )}

      <div className='controls'>
        <div className='raw'>
          <div className={`key ${forward ? 'active' : ''}`}></div>
        </div>
        <div className='raw'>
          <div className={`key ${leftward ? 'active' : ''}`}></div>
          <div className={`key ${backward ? 'active' : ''}`}></div>
          <div className={`key ${rightward ? 'active' : ''}`}></div>
        </div>
        <div className='raw'>
          <div className={`key large ${jump ? 'active' : ''}`}></div>
        </div>
      </div>
      <div className='level'>
        <p>LEVEL {level}</p>
      </div>
    </div>
  );
}

export default Interface;
