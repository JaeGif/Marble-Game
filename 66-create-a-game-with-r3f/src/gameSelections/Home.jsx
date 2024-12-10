import React, { useState } from 'react';
import useGame from '../stores/useGame';

function Home({ renderGame, renderLevelSelection, renderHighscores }) {
  const setMode = useGame((state) => state.setMode);
  const mode = useGame((state) => state.mode);

  const [selectedMode, setSelectedMode] = useState(
    mode === 'casual' ? 'Casual' : mode === 'hardcore' && 'Hardcore'
  );

  const handleModeSet = (e) => {
    // set mode to hardcore or casual
    setSelectedMode(e.target.textContent);
    if (e.target.textContent === 'Casual') {
      setMode('casual');
    } else if (e.target.textContent === 'Hardcore') {
      setMode('hardcore');
    }
  };
  const style = {
    color: 'blue',
  };
  return (
    <div className='home-page'>
      <h1>Marble Run</h1>

      <div>
        <h2 className='hover-blue play' onClick={renderGame}>
          Play
        </h2>
        <span className='mode-select-container'>
          <div className='mode-select-box'>
            <h2
              className='mode-select-title'
              style={{
                color: selectedMode === 'Casual' && 'red',
              }}
              onClick={handleModeSet}
            >
              Casual
            </h2>
            <p>Death is never the end</p>
          </div>
          <div className='mode-select-box'>
            <h2
              className='mode-select-title'
              style={{
                color: selectedMode === 'Hardcore' && 'red',
              }}
              onClick={handleModeSet}
            >
              Hardcore
            </h2>
            <p>The way it was intended</p>
          </div>
        </span>
        <h2 className='hover-blue level-select' onClick={renderLevelSelection}>
          Level Select
        </h2>
        <h2 onClick={renderHighscores} className='hover-blue'>
          Highscores
        </h2>
      </div>
      <footer>
        <div>
          <em>Copyright &#169; {new Date().getFullYear()} Jacob Gifford</em>
        </div>
      </footer>
    </div>
  );
}

export default Home;
