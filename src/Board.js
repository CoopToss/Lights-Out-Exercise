import React, { useState } from 'react';
import Cell from './Cell';
import './Board.css';

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());
  const [hasWon, setHasWon] = useState(false);

  function createBoard() {
    let initialBoard = [];
    for (let y = 0; y < nrows; y++) {
      let row = [];
      for (let x = 0; x < ncols; x++) {
        row.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function flipCellsAround(coord) {
    let [y, x] = coord.split("-").map(Number);
    let boardCopy = board.map(row => [...row]);

    function flipCell(y, x) {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        boardCopy[y][x] = !boardCopy[y][x];
      }
    }

    flipCell(y, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);
    flipCell(y - 1, x);
    flipCell(y + 1, x);

    setBoard(boardCopy);

    let hasWon = boardCopy.every(row => row.every(cell => !cell));
    setHasWon(hasWon);
  }

  function renderCell(y, x) {
    let coord = `${y}-${x}`;
    return (
      <Cell
        key={coord}
        isLit={board[y][x]}
        flipCellsAroundMe={() => flipCellsAround(coord)}
      />
    );
  }

  if (hasWon) {
    return <div className="Board-win">You Won!</div>;
  }

  let tblBoard = [];
  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      row.push(renderCell(y, x));
    }
    tblBoard.push(<tr key={y}>{row}</tr>);
  }

  return (
    <table className="Board">
      <tbody>{tblBoard}</tbody>
    </table>
  );
}

export default Board;
