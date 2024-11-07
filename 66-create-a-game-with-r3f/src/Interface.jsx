import React, { useRef, useEffect, useState } from 'react';
import { useKeyboardControls } from '@react-three/drei';
import useGame from './stores/useGame';
import { addEffect } from '@react-three/fiber';
import uniqid from 'uniqid';
import Api from './classes/Api';
const API_STRING = import.meta.env.VITE_API_STRING;

function Interface() {
  const controls = useKeyboardControls((state) => state);

  const timeRef = useRef();

  const next = useGame((state) => state.next);
  const startOver = useGame((state) => state.startOver);
  const phase = useGame((state) => state.phase);
  const level = useGame((state) => state.level);
  const lives = useGame((state) => state.lives);
  const maxLives = useGame((state) => state.maxLives);
  const score = useGame((state) => state.score);

  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);

  const [liveState, setLiveState] = useState(lives);

  const [formAvailable, setFormAvailable] = useState(false);
  const [username, setUsername] = useState('');

  const post = new Api(API_STRING).post;

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

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
    const unsubscribeLives = useGame.subscribe(
      (state) => state.lives,
      (lives) => {
        setLiveState(lives);
      }
    );

    return () => {
      unsubscribeEffect();
      unsubscribeLives();
    };
  }, []);

  return (
    <div className='interface'>
      <div className='time'>
        <p ref={timeRef}>00.0</p>
        <p>Score {score}</p>
      </div>
      <div className='livesContainer'>
        {liveState &&
          liveState.map((life, i) =>
            life ? (
              i > maxLives - 1 ? (
                <img key={uniqid()} src='assets/blueHeart.svg' alt='heart' />
              ) : (
                <img key={uniqid()} src='assets/heart.svg' alt='heart' />
              )
            ) : (
              <img
                key={uniqid()}
                src='assets/emptyHeart.svg'
                alt='empty heart'
              />
            )
          )}
      </div>
      {phase === 'complete' && (
        <div className='restart' onClick={next}>
          Next
        </div>
      )}
      {phase === 'gameOver' && (
        <div className='restart'>
          {!formAvailable ? (
            <>
              <p onClick={() => setFormAvailable(true)}>Record Highscore</p>
              <p onClick={startOver}>Restart</p>
            </>
          ) : (
            <form className='submit-highscore'>
              <input
                required
                onChange={updateUsername}
                type='text'
                placeholder='username'
              />
              <button
                onClick={() => {
                  if (username === '') return;

                  const { data, isLoading, isSuccess, err } = post('/scores', {
                    user_name: username,
                    score: score,
                  });

                  if (err) console.log(err);
                  if (isSuccess) startOver();
                }}
                type='button'
              >
                Submit Score
              </button>
            </form>
          )}
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
        <p>Stage {level}</p>
      </div>
    </div>
  );
}

export default Interface;
