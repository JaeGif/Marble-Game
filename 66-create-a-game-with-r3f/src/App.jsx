import React, { useState } from 'react';
import Game from './gameSelections/Game';
import LevelSelection from './gameSelections/LevelSelection';
import Home from './gameSelections/Home';
import Highscores from './gameSelections/Highscores';
function App() {
  // Handles rendering of different pages, no router necessary

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
