import React, { useState } from 'react';
import Game from './gameSelections/Game';
import LevelSelection from './gameSelections/LevelSelection';
import Home from './gameSelections/Home';
function App() {
  // Handles rendering of different pages, no router necessary

  const renderGame = () => {
    setCurrentPage(<Game />);
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
      />
    );
  };

  const [currentPage, setCurrentPage] = useState(
    <Home renderGame={renderGame} renderLevelSelection={renderLevelSelection} />
  );
  return <>{currentPage}</>;
}

export default App;
