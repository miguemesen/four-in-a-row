import React, { useState } from "react";
import "./ConnectFour.scss";
const ROWS = 6;
const COLUMNS = 7;

const createBoard = () =>
  Array.from({ length: ROWS }, () => Array(COLUMNS).fill(null));

export default function ConnectFour() {
  const [board, setBoard] = useState(createBoard);
  const [player, setPlayer] = useState("🔴");
  const [winner, setWinner] = useState(null);

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

  const handleClick = (col) => {
    if (winner) return;

    for (let row = ROWS - 1; row >= 0; row--) {
      if (!board[row][col]) {
        const newBoard = board.map((r) => [...r]);
        newBoard[row][col] = player;
        setBoard(newBoard);

        if (checkWinner(newBoard, row, col, player)) {
          setWinner(player);
        } else {
          setPlayer(player === "🔴" ? "🟡" : "🔴");
        }

        break;
      }
    }
  };

  const resetGame = () => {
    setBoard(createBoard);
    setPlayer("🔴");
    setWinner(null);
  };

  return (
    <div className="connect-four-wrapper">
      <h3 className="player-turn">{winner ? `${winner} wins!` : `${player}'s turn`}</h3>
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
      <button onClick={resetGame} style={{ marginTop: 20 }}>
        Restart
      </button>
    </div>
  );
}
