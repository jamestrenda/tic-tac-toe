import { calculateWinner } from "../lib/utils";
import { Square } from "./Square";

export default function Board({ whoseTurn, squares, onPlay }) {
  const winner = calculateWinner(squares);
  const draw = !winner && squares.filter(Boolean).length === squares.length;

  let status;

  if (winner) {
    status = `Winner: ${winner.player}`;
  } else if (draw) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${whoseTurn}`;
  }

  const handleClick = (index, loc) => {
    if (squares[index] || winner) return;

    const nextSquares = squares.slice();

    nextSquares[index] = whoseTurn;
    onPlay(nextSquares, loc);
  };

  return (
    <>
      <div className="status">{status}</div>
      {Array.from({ length: 3 }).map((_, row) => (
        <div key={row} className="board-row">
          {Array.from({ length: 3 }).map((_, col) => {
            const index = row * 3 + col;
            return (
              <Square
                winningSquare={winner && winner.line.includes(index)}
                key={index}
                value={squares[index] && squares[index][0]}
                onSquareClick={() => handleClick(index, [row + 1, col + 1])}
              />
            );
          })}
        </div>
      ))}
    </>
  );
}
