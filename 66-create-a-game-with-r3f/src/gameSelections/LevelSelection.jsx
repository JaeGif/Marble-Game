import React from 'react';
import { levelMap } from '../Level';
import uniqid from 'uniqid';
import useGame from '../stores/useGame';
function LevelSelection({ renderHome, renderGame }) {
  const setLevel = useGame((state) => state.setLevel);
  const mode = useGame((state) => state.mode);
  const handleLevelSelection = (key) => {
    setLevel(parseInt(key));
    renderGame();
  };
  const levels = Object.entries(levelMap);
  return (
    <div className='select-page-container'>
      <span className='level-select-title-container'>
        <span className='home-panel'>
          <h1 className='home-button' onClick={renderHome}>
            Home
          </h1>
          <h1>Mode: {mode}</h1>
        </span>
        <h1>Level Select</h1>
      </span>
      <div className='level-select-page'>
        {levels.map((entry, i) => (
          <div
            className='level-container'
            onClick={() => handleLevelSelection(entry[0])}
            key={uniqid()}
          >
            <h2 className='level-select-number'>Level {entry[0]}</h2>
            <p className='level-title'>{entry[1].title}</p>
            {/*           <img className='level-select-thumbnail' alt={`level ${entry[0]} thumbnail`} />
             */}{' '}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LevelSelection;
