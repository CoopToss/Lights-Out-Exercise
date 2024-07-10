import React from 'react';
import './Cell.css';

function Cell({ isLit, flipCellsAroundMe }) {
  const classes = `Cell ${isLit ? 'Cell-lit' : ''}`;

  return (
    <td className={classes} onClick={flipCellsAroundMe}></td>
  );
}

export default Cell;

