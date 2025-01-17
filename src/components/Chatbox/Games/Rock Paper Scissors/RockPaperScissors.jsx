import React, { useState } from "react";
import "./RockPaperScissors.css";
import rockIHand from "./rock.png";
import paperHand from "./paper.png";
import scissorsHand from "./seissors.png";

const choices = [
    { name: "Rock", image: rockIHand },
    { name: "Paper", image: paperHand },
    { name: "Scissors", image: scissorsHand },
];

const RockPaperScissors = () => {
    const [playerChoice, setPlayerChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [result, setResult] = useState("");
    const [gameState, setGameState] = useState("waiting"); // "waiting" | "playing" | "result"

    const playGame = (playerSelection) => {
        setGameState("playing");
        const computerSelection = choices[Math.floor(Math.random() * choices.length)];
        setTimeout(() => {
            setPlayerChoice(playerSelection);
            setComputerChoice(computerSelection);
            determineWinner(playerSelection.name, computerSelection.name);
            setGameState("result");
        }, 1500); 
    };

    const determineWinner = (player, computer) => {
        if (player === computer) {
            setResult("It's a tie!");
        } else if (
            (player === "Rock" && computer === "Scissors") ||
            (player === "Paper" && computer === "Rock") ||
            (player === "Scissors" && computer === "Paper")
        ) {
            setResult("You win!");
        } else {
            setResult("Nexus wins!");
        }
    };

    const resetGame = () => {
        setPlayerChoice(null);
        setComputerChoice(null);
        setResult("");
        setGameState("waiting");
    };

    return (
        <div className="rock-paper-scissors">
            <h1 className="rock-title">Rock Paper Scissors</h1>
            <div className="hands">
                <div className="label player-label">You</div>
                    <div className={`hand player-hand ${gameState}`}>
                        {playerChoice && <img src={playerChoice.image} alt={playerChoice.name} />}
                    </div>
                    <div className="label computer-label">Nexus</div>
                    <div className={`hand computer-hand ${gameState}`}>
                        {computerChoice && <img src={computerChoice.image} alt={computerChoice.name} />}
                    </div>
            </div>

            <div className="choices">
                {choices.map((choice) => (
                    <button
                        key={choice.name}
                        onClick={() => playGame(choice)}
                        disabled={gameState === "playing"}
                    >
                        {choice.name}
                    </button>
                ))}
            </div>
            {result && (
                <div className="result">
                    <p>You chose: {playerChoice.name}</p>
                    <p>Nexus chose: {computerChoice.name}</p>
                    <h2>{result}</h2>
                </div>
            )}
            <button className="reset-button" onClick={resetGame}>
                Play Again
            </button>
        </div>
    );
};

export default RockPaperScissors;