import React, { useEffect, useState } from "react";
import "./SnakeGame.css";

const SnakeGame = () => {
    const [snake, setSnake] = useState([[0, 0], [0, 1], [0, 2]]);
    const [food, setFood] = useState([Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)]);
    const [direction, setDirection] = useState("RIGHT");
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.key) {
                case "ArrowUp":
                    if (direction !== "DOWN") setDirection("UP");
                    break;
                case "ArrowDown":
                    if (direction !== "UP") setDirection("DOWN");
                    break;
                case "ArrowLeft":
                    if (direction !== "RIGHT") setDirection("LEFT");
                    break;
                case "ArrowRight":
                    if (direction !== "LEFT") setDirection("RIGHT");
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        const gameInterval = setInterval(moveSnake, 150);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            clearInterval(gameInterval);
        };
    }, [snake, direction]);

    const moveSnake = () => {
        const newSnake = [...snake];
        const head = newSnake[newSnake.length - 1];
        let newHead;

        switch (direction) {
            case "UP":
                newHead = [head[0], head[1] - 1];
                break;
            case "DOWN":
                newHead = [head[0], head[1] + 1];
                break;
            case "LEFT":
                newHead = [head[0] - 1, head[1]];
                break;
            case "RIGHT":
                newHead = [head[0] + 1, head[1]];
                break;
            default:
                return;
        }

        if (checkCollision(newHead)) {
            setGameOver(true);
            return;
        }

        newSnake.push(newHead);

        if (newHead[0] === food[0] && newHead[1] === food[1]) {
            setFood([Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)]);
            setScore(score + 10);
        } else {
            newSnake.shift();
        }

        setSnake(newSnake);
    };

    const checkCollision = (head) => {
        return (
            head[0] < 0 ||
            head[0] >= 20 ||
            head[1] < 0 ||
            head[1] >= 20 ||
            snake.some((segment) => segment[0] === head[0] && segment[1] === head[1])
        );
    };

    const resetGame = () => {
        setSnake([[0, 0], [0, 1], [0, 2]]);
        setFood([Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)]);
        setDirection("RIGHT");
        setGameOver(false);
        setScore(0);
    };

    return (
        <div className="snake-game">
            <h1 className="snake-title">Snake Game</h1>
            <div className="game-info">
                <p>Score: {score}</p>
            </div>
            <div className="game-area">
                {gameOver && <div className="game-over">Game Over!</div>}
                {snake.map((segment, index) => (
                    <div
                        key={index}
                        className="snake-segment"
                        style={{ left: `${segment[0] * 20}px`, top: `${segment[1] * 20}px` }}
                    />
                ))}
                <div className="food" style={{ left: `${food[0] * 20}px`, top: `${food[1] * 20}px` }} />
            </div>
            {gameOver ? (
                <button className="reset-button" onClick={resetGame}>
                    Restart Game
                </button>
            ) : (
                <div className="controls">
                    <button onClick={() => setDirection("UP")}><i class="ri-arrow-up-line"></i></button>
                    <div>
                        <button onClick={() => setDirection("LEFT")}><i class="ri-arrow-left-line"></i></button>
                        <button onClick={() => setDirection("RIGHT")}><i class="ri-arrow-right-line"></i></button>
                    </div>
                    <button onClick={() => setDirection("DOWN")}><i class="ri-arrow-down-line"></i></button>
                </div>
            )}
        </div>
    );
};

export default SnakeGame;
