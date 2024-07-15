import React, { useState, useEffect } from 'react';
import Board from './Board';
import './App.css';

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [isComputerTurn, setIsComputerTurn] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  useEffect(() => {
    if (isComputerTurn && !calculateWinner(squares) && !isDraw(squares)) {
      const emptySquares = squares.map((sq, idx) => (sq === null ? idx : null)).filter((idx) => idx !== null);
      const randomIndex = Math.floor(Math.random() * emptySquares.length);
      const newSquares = squares.slice();
      newSquares[emptySquares[randomIndex]] = 'O';
      setSquares(newSquares);
      setIsComputerTurn(false);
      setXIsNext(true);
    }
  }, [isComputerTurn, squares]);

  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner || isDraw(squares)) {
      if (winner) {
        if (winner === 'X') {
          setPlayerScore(playerScore + 1);
        } else if (winner === 'O') {
          setComputerScore(computerScore + 1);
        }
      }
      setTimeout(() => resetGame(), 2000);
    }
  }, [squares]);

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i] || isComputerTurn) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = 'X';
    setSquares(newSquares);
    setXIsNext(false);
    setIsComputerTurn(true);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setIsComputerTurn(false);
  };

  const winner = calculateWinner(squares);
  const status = winner ? 'Winner: ' + winner : isDraw(squares) ? 'Draw!' : 'Next player: ' + (xIsNext ? 'X' : 'O');

  return (
    <div className="game">
      <div className="score-board">
        <div>Player Score: {playerScore}</div>
        <div>Computer Score: {computerScore}</div>
      </div>
      <div className="game-board">
        <Board squares={squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
      </div>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const isDraw = (squares) => {
  return squares.every(square => square !== null);
};

export default App;
