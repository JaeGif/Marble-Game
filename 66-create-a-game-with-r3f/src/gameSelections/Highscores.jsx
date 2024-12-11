import React, { useEffect, useState } from 'react';
import Api from '../classes/Api';
import { timeConverter } from '../functions/timeConverter';
const API_STRING = import.meta.env.VITE_API_STRING;

function Highscores({ renderHome }) {
  const get = new Api(API_STRING).get;
  const [highscores, setHighscores] = useState(); // [data]
  useEffect(() => {
    if (highscores) return;
    getTopScores();
  }, [highscores]);
  const getTopScores = async () => {
    const { data, isLoading, isSuccess, err } = await get('/scores');
    if (err) console.error(err);
    if (isSuccess) setHighscores(data);
  };

  return (
    <div className='select-page-container'>
      <span className='level-select-title-container'>
        <span className='home-panel'>
          <h1 className='home-button' onClick={renderHome}>
            Home
          </h1>
        </span>
        <h1>Highscores</h1>
      </span>
      <div className='scores-container'>
        <span className='score-row'>
          <p>Player</p>
          <p>Score</p>
          <p>Time [h:m:s:ms]</p>
          <p>Date</p>
        </span>
        {highscores &&
          highscores.map((score) => (
            <span className='score-row'>
              <p>{score.user_name}</p>
              <p>{score.score}</p>
              <p>{timeConverter.millisecondsToSeconds(score.final_time)}</p>
              <p>{timeConverter.isoToStandard(score.created_at)}</p>
            </span>
          ))}
      </div>
    </div>
  );
}

export default Highscores;
