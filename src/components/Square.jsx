import React from "react";

export function Square({ value, onSquareClick, winningSquare }) {
  return (
    <button
      className="square"
      onClick={onSquareClick}
      style={{ backgroundColor: winningSquare ? "lime" : undefined }}
    >
      {value}
    </button>
  );
}
