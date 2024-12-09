import React, { useState } from 'react';
import useGame from '../stores/useGame';

function Home({ renderGame, renderLevelSelection }) {
  const setMode = useGame((state) => state.setMode);
  const [selectedMode, setSelectedMode] = useState('Hardcore');

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
    <div>
      <h1>Marble Run</h1>

      <h2 onClick={renderGame}>Play</h2>

      <div>
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
      <div>
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

      <h2 onClick={renderLevelSelection}>Level Select</h2>

      <footer>
        <p>Built with: </p>
        <div>
          <em>Copyright &#169; {new Date().getFullYear()} Jacob Gifford</em>
        </div>
      </footer>
    </div>
  );
}

export default Home;
