import React, { useState } from 'react';
import './Menu.scss';

const englishMapper = {
  finalizado: 'Finished',
  iniciado: 'Started'
}

const Menu = ({setIsDraw, showLoad, setShowLoad, isGameStarted, isGameReady, setGame, setSelected, setWinner, setPlayer, setIsGameReady, mode, setMode, allGames, setLoadGame, setIsGameStarted, setIsGameFinished}) => {

  const handlePlayClick = (game) => {
    setMode('playingLoad')
    setLoadGame(game)
    setSelected({dropdown1: `${game.jugador1.id}`, dropdown2: `${game.jugador2.id}`})
    setIsDraw(false)
    if (game.resultado === 'empate' && game.estado === 'finalizado') {
      setIsGameFinished(true)
      setWinner(undefined)
      setIsDraw(true)
    } else if (game.estado === 'finalizado') {
      setIsGameFinished(true)
      setWinner(game.turno === 1 ? "🔴" : "🟡") // era turno del que perdio, entonces gana el anterior
    } else {
      setIsGameStarted(true)
      setIsGameFinished(false)
      setPlayer(game.turno === 0 ? "🔴" : "🟡")
      setGame({partida: game})
    }
    setIsGameReady(true)
    setIsGameStarted(true)
  };

  const handleNewGame = () => {
    if (mode === 'new') {
      setMode('newGame')
    } else {
      setMode('new')
    }
  }

  return (
    <div className="menu">

      <div className="menu__buttons">
        <button onClick={handleNewGame} className="menu__button">
          New Game
        </button>
        <button onClick={() => setMode('load')} className="menu__button">
          Load Game
        </button>
      </div>

      {showLoad && mode === 'load' && (
        <div className="menu__section">
          <table className="menu__table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Player 1</th>
                <th>Player 2</th>
                <th>State</th>
                <th>Result</th>
                <th>Play</th>
              </tr>
            </thead>
            <tbody>
              {allGames.map((game) => (
                <tr key={game.id}>
                  <td>{game.fechaHora}</td>
                  <td>{game.jugador1.nombre}</td>
                  <td>{game.jugador2.nombre}</td>
                  <td>{englishMapper[game.estado]}</td>
                  <td>{game.resultado === "pendiente" ? "Pending" : game.resultado === 'empate' ? "Draw" : `Winner ${game.jugador1.id === Number(game.resultado) ? game.jugador1.nombre : game.jugador2.nombre}`}</td>
                  <td>
                    <button
                      className="menu__play-button"
                      onClick={() => handlePlayClick(game)}
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
