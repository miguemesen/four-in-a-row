import React, { useState } from 'react';
import './Players.scss';

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newPlayer, setNewPlayer] = useState({ id: '', name: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlayer((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreatePlayer = () => {
    const { id, name } = newPlayer;
    if (!id || !name) return alert('Both ID and Name are required.');
    if (players.some((p) => p.id === id)) return alert('ID already exists.');

    setPlayers((prev) => [
      ...prev,
      { id, name, wins: 0, losses: 0, draws: 0 }
    ]);
    setNewPlayer({ id: '', name: '' });
    setShowForm(false);
  };

  return (
    <div className="players-page">
      <h2 className="players-page__title">Players</h2>

      <table className="players-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Score (W+L)</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Draws</th>
          </tr>
        </thead>
        <tbody>
          {players.length === 0 ? (
            <tr>
              <td colSpan="6" className="players-table__empty">No players yet</td>
            </tr>
          ) : (
            players.map((player) => (
              <tr key={player.id}>
                <td>{player.id}</td>
                <td>{player.name}</td>
                <td>{player.wins + player.losses}</td>
                <td>{player.wins}</td>
                <td>{player.losses}</td>
                <td>{player.draws}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <button
        className="players-page__toggle-button"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Cancel' : 'Create New Player'}
      </button>

      {showForm && (
        <div className="players-form">
          <input
            type="text"
            name="id"
            placeholder="Player ID"
            value={newPlayer.id}
            onChange={handleInputChange}
            className="players-form__input"
          />
          <input
            type="text"
            name="name"
            placeholder="Player Name"
            value={newPlayer.name}
            onChange={handleInputChange}
            className="players-form__input"
          />
          <button
            onClick={handleCreatePlayer}
            className="players-form__submit"
          >
            Create Player
          </button>
        </div>
      )}
    </div>
  );
};

export default Players;
