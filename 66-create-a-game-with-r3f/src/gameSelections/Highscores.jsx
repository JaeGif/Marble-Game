import React from 'react';
import Api from '../classes/Api';
const API_STRING = import.meta.env.VITE_API_STRING;

function Highscores({ renderHome }) {
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
          <p>Time</p>
        </span>
        <span className='score-row'>
          <p>spartacus jneiwjtth</p>
          <p>31498711089568970</p>
          <p>00:00:00:00:00:</p>
        </span>
      </div>
    </div>
  );
}

export default Highscores;
