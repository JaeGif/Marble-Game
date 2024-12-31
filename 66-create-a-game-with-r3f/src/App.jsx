import React, { useEffect, useState } from 'react';
import Game from './gameSelections/Game';
import LevelSelection from './gameSelections/LevelSelection';
import Home from './gameSelections/Home';
import Highscores from './gameSelections/Highscores';
import useGame from './stores/useGame';
function App() {
  // Handles rendering of different pages, no router necessary

  // handle dev mode test zone
  const level = useGame((state) => state.level);

  useEffect(() => {
    if (level === 'TestZone') renderGame();
  }, [level]);
  const renderGame = () => {
    setCurrentPage(<Game renderHome={renderHome} />);
  };
  const renderLevelSelection = () => {
    setCurrentPage(
      <LevelSelection renderHome={renderHome} renderGame={renderGame} />
    );
  };

  const renderHome = () => {
    setCurrentPage(
      <Home
        renderGame={renderGame}
        renderLevelSelection={renderLevelSelection}
        renderHighscores={renderHighscores}
      />
    );
  };

  const renderHighscores = () => {
    setCurrentPage(<Highscores renderHome={renderHome} />);
  };

  const [currentPage, setCurrentPage] = useState(
    <Home
      renderGame={renderGame}
      renderLevelSelection={renderLevelSelection}
      renderHighscores={renderHighscores}
    />
  );
  return <>{currentPage}</>;
}

export default App;
