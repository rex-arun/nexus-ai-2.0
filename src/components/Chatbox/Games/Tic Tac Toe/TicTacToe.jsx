import React, { useState, useEffect } from "react";
import "./TicTacToe.css"; 

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const winner = calculateWinner(board);

    const handleClick = (index) => {
        if (board[index] || winner) return; 
        const newBoard = board.slice();
        newBoard[index] = isXNext ? "X" : "O"; 
        setBoard(newBoard);
        setIsXNext(false);
    };

    // handle computer's turn
    useEffect(() => {
        if (!isXNext && !winner) {
            const computerMove = getComputerMove(board);
            if (computerMove !== null) {
                const newBoard = board.slice();
                newBoard[computerMove] = "O";
                setBoard(newBoard);
                setIsXNext(true);
            }
        }
    }, [isXNext, board, winner]);

    const renderSquare = (index) => {
        const squareClass = board[index] === "X" ? "square x" : board[index] === "O" ? "square o" : "square";
        return (
            <button className={squareClass} onClick={() => handleClick(index)}>
                {board[index]}
            </button>
        );
    };
    

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
    };

    return (
        <div className="tic-tac-toe">
            <div className="status">
                {winner ? `Winner: ${winner}` : `Next player: ${isXNext ? "X" : "O"}`}
            </div>
            <div className="board">
                <div className="board-row">
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                </div>
                <div className="board-row">
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </div>
                <div className="board-row">
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </div>
            </div>
            <button className="reset-button" onClick={resetGame}>Reset Game</button>
        </div>
    );
};

// Calculate the winner
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

// Get the computer's move
const getComputerMove = (board) => {
    const emptySquares = board.map((value, index) => (value === null ? index : null)).filter(index => index !== null);
    if (emptySquares.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptySquares.length);
        return emptySquares[randomIndex]; // Return a random empty square
    }
    return null; // No available moves
};

export default TicTacToe;