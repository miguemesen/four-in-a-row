import React, { useState } from 'react';
import './Menu.scss';

const Menu = ({showLoad, setShowLoad, isGameStarted, isGameReady, setGame, setSelected, setWinner, setPlayer, setIsGameReady, mode, setMode, allGames, setLoadGame, setIsGameStarted, setIsGameFinished}) => {

  const handlePlayClick = (game) => {
  setMode('playingLoad')
  setLoadGame(game)
  setSelected({dropdown1: `${game.jugador1.id}`, dropdown2: `${game.jugador2.id}`})

  // Asegúrate de que el tablero es un array
  const tablero = typeof game.tablero === "string" ? JSON.parse(game.tablero) : game.tablero;
  const fichasJugador1 = tablero.flat().filter(f => f === 1 || f === "🔴").length;
  const fichasJugador2 = tablero.flat().filter(f => f === 2 || f === "🟡").length;

  if (game.estado === 'finalizado') {
    // Detectar empate: ambos jugadores han puesto 21 fichas y no hay ganador
    if (fichasJugador1 === 21 && fichasJugador2 === 21 && !game.ganador) {
      setIsGameFinished(true)
      setWinner("Empate 🤝")
    } else {
      setIsGameFinished(true)
      setWinner(game.turno === 1 ? "🔴" : "🟡")
    }
  } else {
    setIsGameStarted(true)
    setIsGameFinished(false)
    setPlayer(game.turno === 0 ? "🔴" : "🟡")
    setGame({partida: game})
  }
  setIsGameReady(true)
  setIsGameStarted(true)
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

      {showLoad && mode === 'load' && (
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
              {allGames
                .slice()
                .sort((a, b) => new Date(b.fechaHora) - new Date(a.fechaHora))
                .map((game) => (
                  <tr key={game.id}>
                    <td>{game.fechaHora}</td>
                    <td>{game.jugador1.nombre}</td>
                    <td>{game.jugador2.nombre}</td>
                    <td>{game.estado}</td>
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
