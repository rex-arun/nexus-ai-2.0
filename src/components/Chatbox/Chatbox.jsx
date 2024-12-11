import React, { useState, useEffect, useRef } from "react";
import { handleUserInput, handleVoiceInput } from "./chatFunctions"; // Import the helper functions
import "./Chatbox.css";
import "./Chatbox2.css";

export default function Chatbox() {
    const [isTyping, setIsTyping] = useState(false);
    const [selectedPrompt, setSelectedPrompt] = useState(null);
    const [messages, setMessages] = useState([]);
    const [chatStarted, setChatStarted] = useState(false);
    const [isVoiceMode, setIsVoiceMode] = useState(false);
    const [isListening, setIsListening] = useState(false);

    const chatContainerRef = useRef(null);
    const recognition = useRef(null);

    // Initialize speech recognition API if available
    useEffect(() => {
        if ("webkitSpeechRecognition" in window) {
            recognition.current = new window.webkitSpeechRecognition();
            recognition.current.continuous = true;
            recognition.current.interimResults = true;
            recognition.current.lang = "en-US";

            recognition.current.onstart = () => setIsListening(true);
            recognition.current.onend = () => setIsListening(false);
            recognition.current.onresult = (event) =>
                handleVoiceInput(event, messages, setMessages, speak); // Use the imported voice input handler
        }
    }, [messages]); // Add messages as a dependency to ensure the latest state is used

    // Function to speak the bot's response
    const speak = (response) => {
        if ("speechSynthesis" in window) {
            const utterance = new SpeechSynthesisUtterance(response);
            speechSynthesis.speak(utterance);
        }
    };

    // Function to start voice input
    const startVoiceInput = () => {
        if (recognition.current) {
            recognition.current.start();
        }
    };

    // Function to stop voice input
    const stopVoiceInput = () => {
        if (recognition.current) {
            recognition.current.stop();
        }
    };

    // Function to toggle voice mode
    const toggleVoiceMode = () => {
        setIsVoiceMode(true);
        startVoiceInput();
    };

    // Function to close voice mode
    const closeVoiceMode = () => {
        setIsVoiceMode(false);
        stopVoiceInput();
    };

    return (
        <>
            {/* Voice Mode UI */}
            {isVoiceMode ? (
                <div className="voice-mode">
                    <div className="voice-animation">
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                    <div className="close-button" onClick={closeVoiceMode}>
                        <i className="ri-close-line"></i>
                    </div>
                </div>
            ) : (
                <>
                    {/* Header Section */}
                    {!chatStarted && (
                        <div className="header-section">
                            <h1>
                                What's on Your Mind
                                <br />
                                I'm Here to Help...
                            </h1>
                            <div className="promt">
                                <div
                                    className="promt1"
                                    onClick={() =>
                                        setSelectedPrompt(
                                            "Help me on my Project Report."
                                        )
                                    }
                                >
                                    <p>Help me on my Project Report.</p>
                                </div>
                                <div
                                    className="promt2"
                                    onClick={() =>
                                        setSelectedPrompt(
                                            "Plan a Road Trip with friends."
                                        )
                                    }
                                >
                                    <p>Plan a Road Trip with friends.</p>
                                </div>
                                <div
                                    className="promt3"
                                    onClick={() =>
                                        setSelectedPrompt(
                                            "How can I prepare for a technical associate interview?"
                                        )
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

                    {/* Chat Messages */}
                    <div className="chat-section" ref={chatContainerRef}>
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`message ${message.sender}`}
                            >
                                <p>{message.text}</p>
                            </div>
                        ))}
                    </div>

                    {/* Input Section */}
                    <div className="input-section-container">
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder="Start a conversation..."
                                onChange={(e) =>
                                    setIsTyping(e.target.value.trim() !== "")
                                }
                                onKeyDown={(e) =>
                                    handleUserInput(
                                        e,
                                        messages,
                                        setMessages,
                                        isVoiceMode,
                                        speak
                                    ) // Call the imported user input handler
                                }
                            />
                            <div className="icons">
                                {!isTyping && (
                                    <>
                                        <i className="ri-links-line"></i>
                                        <i
                                            className="ri-voice-ai-line"
                                            onClick={toggleVoiceMode}
                                        ></i>
                                    </>
                                )}

                                {isTyping && (
                                    <div className="typing-indicator">
                                        <i className="ri-send-plane-fill"></i>
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
}
