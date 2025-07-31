import React, { useState } from 'react';
import './Menu.scss';

const mockSavedGames = [
  {
    id: 1,
    date: '2025-07-01 14:30',
    player1: 'Alice',
    player2: 'Bob',
    state: 'Finished',
  },
  {
    id: 2,
    date: '2025-07-02 16:00',
    player1: 'Charlie',
    player2: 'Diana',
    state: 'In Progress',
  },
];

const Menu = ({mode, setMode}) => {

  const handlePlayClick = (gameId) => {
    console.log('play game', gameId);
  };

  return (
    <div className="menu">

      <div className="menu__buttons">
        <button onClick={() => setMode('new')} className="menu__button">
          New Game
        </button>
        <button onClick={() => setMode('load')} className="menu__button">
          Load Game
        </button>
      </div>

      {mode === 'load' && (
        <div className="menu__section">
          <table className="menu__table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Player 1</th>
                <th>Player 2</th>
                <th>State</th>
                <th>Play</th>
              </tr>
            </thead>
            <tbody>
              {mockSavedGames.map((game) => (
                <tr key={game.id}>
                  <td>{game.date}</td>
                  <td>{game.player1}</td>
                  <td>{game.player2}</td>
                  <td>{game.state}</td>
                  <td>
                    <button
                      className="menu__play-button"
                      onClick={() => handlePlayClick(game.id)}
                    >
                      Play
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Menu;
