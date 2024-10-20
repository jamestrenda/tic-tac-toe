import { useState } from "react";
import Board from "./Board";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [locationHistory, setLocationHistory] = useState([]);
  const [sortAsc, setSortAsc] = useState(true);

  const xIsNext = currentMove % 2 === 0; // if even, it's X's turn
  const currentSquares = history[currentMove];
  const whoseTurn = xIsNext ? "X" : "O";

  const handlePlay = (squares, loc) => {
    const nextHistory = [...history.slice(0, currentMove + 1), squares];
    const nextLocations = [...locationHistory.slice(0, currentMove), loc];

    setHistory(nextHistory);
    setLocationHistory(nextLocations);
    setCurrentMove(nextHistory.length - 1);
  };

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((_, move) => {
    let description;

    const [row, col] = locationHistory[move - 1] || [];

    if (move) {
      description = `Go to move #${move} (${row}, ${col})`;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        {move === currentMove ? (
          `You are at ${
            move ? `move #${move} (${row}, ${col})` : `the start of the game`
          }`
        ) : (
          <button onClick={() => jumpTo(move)}>{description}</button>
        )}
      </li>
    );
  });

  const handleSortMoves = () => {
    setSortAsc(!sortAsc);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board
          whoseTurn={whoseTurn}
          squares={currentSquares}
          onPlay={handlePlay}
        />
      </div>
      <div className="game-info">
        <div>
          <button onClick={handleSortMoves}>
            <SortIcon />
          </button>
        </div>
        <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {sortAsc ? moves : moves.reverse()}
        </ol>
      </div>
    </div>
  );
}

const SortIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className="lucide lucide-arrow-down-up"
  >
    <path d="m3 16 4 4 4-4" />
    <path d="M7 20V4" />
    <path d="m21 8-4-4-4 4" />
    <path d="M17 4v16" />
  </svg>
);
