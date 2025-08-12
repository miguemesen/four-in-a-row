import React, { useEffect, useState } from "react";
import "./ConnectFour.scss";
import { drawPlayer, loserPlayer, postGame, updateGame, winnerPlayer } from "./api";
const ROWS = 6;
const COLUMNS = 7;

const createBoard = () =>
  Array.from({ length: ROWS }, () => Array(COLUMNS).fill(null));

export default function ConnectFour({isDraw, setIsDraw, player, setPlayer, winner, setWinner, loadedGame, game, setGame, playerOne, playerTwo, players, isGameStarted, setIsGameStarted, setIsGameFinished}) {


  let playerMapper = {
    "🔴": playerOne,
    "🟡": playerTwo,
  }
  const [board, setBoard] = useState(loadedGame ? JSON.parse(loadedGame.tablero) : null || createBoard);

  const isBoardFull = (b) => b.every(row => row.every(Boolean));

  const checkWinner = (board, row, col, player) => {
    const directions = [
      [0, 1], // horizontal
      [1, 0], // vertical
      [1, 1], // diagonal /
      [1, -1], // diagonal \
    ];

    for (let [dx, dy] of directions) {
      let count = 1;

      for (let dir of [-1, 1]) {
        let r = row + dx * dir;
        let c = col + dy * dir;

        while (
          r >= 0 &&
          r < ROWS &&
          c >= 0 &&
          c < COLUMNS &&
          board[r][c] === player
        ) {
          count++;
          r += dx * dir;
          c += dy * dir;
        }
      }

      if (count >= 4) return true;
    }

    return false;
  };

  const handleClick = async (col) => {
    let newGameId;
    if (!isGameStarted && !winner && !isDraw) {
      setIsGameStarted(true)
      const localGame = {
        jugador1_Id: playerOne,
        jugador2_Id: playerTwo,
        estado: "iniciado",
        fechaHora: new Date().toISOString(),
        tablero: JSON.stringify(board),
        resultado: "pendiente",
        turno: 0
      }
      const res = await postGame(localGame)
      setGame(res)
      newGameId = res.partida.id;
    }
    if (winner || isDraw) return;

    let tempIsWinner = false;
    let newBoard;
    for (let row = ROWS - 1; row >= 0; row--) {
      if (!board[row][col]) {
        newBoard = board.map((r) => [...r]);
        newBoard[row][col] = player;
        setBoard(newBoard);

        if (checkWinner(newBoard, row, col, player)) {
          tempIsWinner = true
          setWinner(player);
          winnerPlayer(playerMapper[player]) // llamadas a api
          loserPlayer(playerMapper[player === "🔴" ? "🟡" : "🔴"])
          updateGame(game.partida.id, {
            estado: "finalizado",
            tablero: JSON.stringify(newBoard),
            resultado: playerMapper[player],
            turno: player === "🔴" ? 1 : 0
          })
        } else if (isBoardFull(newBoard)) {
          setIsDraw(true);
          setIsGameFinished(true);
          drawPlayer(playerOne)
          drawPlayer(playerTwo)
          updateGame(newGameId || game.partida.id, {
            estado: "finalizado",
            tablero: JSON.stringify(newBoard),
            resultado: "empate",
            turno: player === "🔴" ? 1 : 0
          });
        } 
        else {
          setPlayer(player === "🔴" ? "🟡" : "🔴");
          updateGame(newGameId || game.partida.id, {
            estado: "iniciado",
            tablero: JSON.stringify(newBoard),
            resultado: "pendiente",
            turno: player === "🔴" ? 1 : 0
          });
        }

        break;
      }
    }
    if (!tempIsWinner) {
      updateGame(newGameId || game.partida.id, {
        estado: "iniciado",
        tablero: JSON.stringify(newBoard),
        resultado: "pendiente",
        turno: player === "🔴" ? 1 : 0,
      })
    }
  };

  const resetGame = () => {
    setBoard(createBoard);
    setPlayer("🔴");
    setWinner(null);
    setIsDraw(false)
  };

  useEffect(() => {
    if(winner) {
      setIsGameFinished(true)
    }
  },[winner])

  return (
    <div className="connect-four-wrapper">
      <h3 className="player-turn">
        {winner
          ? `${winner} ${players.find(p => p.id === Number(playerMapper[winner])).nombre} wins!`
          : isDraw
            ? `It's a draw!`
            : `${player} ${players.find(p => p.id === Number(playerMapper[player])).nombre}'s turn`}
      </h3>      
      <div className="board" style={{ display: "inline-grid", gridTemplateColumns: `repeat(${COLUMNS}, 50px)` }}>
        {board.map((row, i) =>
          row.map((cell, j) => (
            <div
              className="square"
              key={`${i}-${j}`}
              onClick={() => handleClick(j)}
              style={{
                width: 50,
                height: 50,
                border: "1px solid #333",
                fontSize: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                backgroundColor: "#eee",
              }}
            >
              {cell}
            </div>
          ))
        )}
      </div>
      <br />
      <button disabled={winner || isDraw} onClick={resetGame} style={{ marginTop: 20 }}>
        Restart
      </button>
    </div>
  );
}
