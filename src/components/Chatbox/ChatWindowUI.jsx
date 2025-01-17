import React from "react";
import TicTacToe from "./Games/Tic Tac Toe/TicTacToe";
import RockPaperScissors from "./Games/Rock Paper Scissors/RockPaperScissors";
import 'remixicon/fonts/remixicon.css'
import SnakeGame from "./Games/SnakeGame/SnakeGame";

const ChatWindowUI = ({
    isVoiceMode,
    isMicOn,
    chatStarted,
    messages,
    inputValue,
    handleInputChange,
    handleUserInputWrapper,
    sendMessage,
    toggleVoiceMode,
    closeVoiceMode,
    downloadImage,
    setSelectedPrompt,
    lastMessageRef,
    chatContainerRef,
    inputRef,
    isTyping,
    setInputValue,
    stopVoiceInput,
}) => {
    return (
        <>
            {/* ======= Voice Mode UI ========== */}
{isVoiceMode ? (
    <div className={`voice-mode ${isMicOn ? "active" : ""}`}>
        {isMicOn ? (
            <p>Nexus is Listening..</p>
        ) : (
            <p>Nexus Stopped Listening..</p>
        )}

        <div className="voice-animation"></div>
        
        <div className="mic-close-container">
            <button
                className={`mic-button ${
                    isMicOn ? "button-active" : "button-deactive"
                }`}
                onClick={() => {
                    if (isMicOn) {
                        stopVoiceInput();
                    } else {
                        startVoiceInput();
                    }
                }}
            >
                <i
                    className={`ri-mic-${
                        isMicOn ? "fill" : "off-fill"
                    }`}
                ></i>
            </button>

            <div className="close-button" onClick={closeVoiceMode}>
                <i className="ri-close-line"></i>
            </div>
        </div>
    </div>
) : (
    <>
                    {/* Header section (Render if mgs array is empty) */}
                    {!chatStarted && (
                        <div className="header-section">
                            <h1 className="title">
                                What's on Your Mind
                                <br />
                                I'm Here to Help...
                            </h1>

                            <div className="promt">
                                <div
                                    className="promt1"
                                    onClick={() => {
                                        sendMessage("Help me on my Project Report.")
                                    }}
                                >
                                    <p>Help me on my Project Report.</p>
                                </div>
                                <div
                                    className="promt2"
                                    onClick={() =>
                                        sendMessage("image/prompt: a cute puppy.")
                                    }
                                >
                                    <p>Generate a cute Puppy Image.</p>
                                </div>
                                <div
                                    className="promt3"
                                    onClick={() =>
                                        sendMessage("How can I prepare for a technical associate interview?")
                                    }
                                >
                                    <p>
                                        How can I prepare for a technical
                                        associate interview?
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* =============== Chat messages UI ============ */}
                    <div className="chat-section" ref={chatContainerRef}>
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`message ${message.sender} ${
                                    message.className || ""
                                }`}
                                ref={
                                    index === messages.length - 2
                                        ? lastMessageRef
                                        : null
                                }
                            >
                                {message.isLoading ? (
                                    <div className="loading-dots">
                                        <span className="dot"></span>
                                        <span className="dot"></span>
                                        <span className="dot"></span>
                                    </div>
                                ) : (
                                    <>
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: message.text,
                                            }}
                                        ></p>
                                        {message.isTicTacToe && <TicTacToe />}
                                        {message.isRockPaperScissors && (
                                            <RockPaperScissors />
                                        )}
                                        {message.isSnakeGame && <SnakeGame />}
                                    </>
                                )}
                                {message.imageUrl && (
                                    <div className="image-box">
                                        <img
                                            src={message.imageUrl}
                                            alt="Generated"
                                            className="mx-auto rounded-lg shadow-lg"
                                        />
                                        <button
                                            onClick={() =>
                                                downloadImage(message.imageUrl)
                                            }
                                            className="download-button"
                                        >
                                            <i className="ri-file-download-fill"></i>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* ============ Input section ========= */}
                    <div className="input-section-container">
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder="Start a conversation..."
                                value={inputValue}
                                onChange={(e) => {
                                    setInputValue(e.target.value);
                                    handleInputChange(e);
                                }}
                                onKeyDown={handleUserInputWrapper}
                                ref={inputRef}
                            />

                            <div className="icons">
                                {!isTyping && (
                                    <>
                                        <i
                                            className="ri-image-ai-fill"
                                            onClick={() => {
                                                const inputField =
                                                    document.querySelector(
                                                        ".input-container input"
                                                    );
                                                if (inputField) {
                                                    inputField.value = `image/prompt: ${inputField.value}`;
                                                    inputField.focus();
                                                }
                                            }}
                                        ></i>
                                        <i
                                            className="ri-voice-ai-line"
                                            onClick={toggleVoiceMode}
                                        ></i>
                                    </>
                                )}

                                {isTyping && (
                                    <div className="typing-indicator">
                                        <i
                                            className="ri-send-plane-fill"
                                            onClick={() => {
                                                const inputValue =
                                                    inputRef.current.value.trim();
                                                sendMessage(inputValue);
                                            }}
                                        ></i>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="acknowledge">
                            <p>
                                NexusAI can make mistakes, double-check
                                important stuff
                            </p>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ChatWindowUI;
