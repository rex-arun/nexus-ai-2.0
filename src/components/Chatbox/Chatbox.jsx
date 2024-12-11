import React, { useState, useEffect, useRef } from "react";
import { handleUserInput, handleVoiceInput } from "./Helper/chatFunctions";
import 'remixicon/fonts/remixicon.css'
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

    // ========= Initialize speech recognition API ==========
    useEffect(() => {
        if ("webkitSpeechRecognition" in window) {
            recognition.current = new window.webkitSpeechRecognition();
            recognition.current.continuous = true;
            recognition.current.interimResults = true;
            recognition.current.lang = "en-US";

            recognition.current.onstart = () => setIsListening(true);
            recognition.current.onend = () => setIsListening(false);
            recognition.current.onresult = (event) =>
                handleVoiceInput(event, setMessages, speak);
        }
    }, []);

    // Handle input change
    const handleInputChange = (event) => {
        if (event.target.value.trim() !== "") {
            setIsTyping(true);
        } else {
            setIsTyping(false);
        }
    };

    // Handle user input
    const handleUserInputWrapper = (event) => {
        handleUserInput(
            event,
            messages,
            setMessages,
            setIsTyping,
            setChatStarted,
            isVoiceMode,
            speak
        );
    };

    // Start voice input
    const startVoiceInput = () => {
        if (recognition.current) {
            recognition.current.start();
        }
    };

    // Stop voice input
    const stopVoiceInput = () => {
        if (recognition.current) {
            recognition.current.stop();
        }
    };

    // Speak the response
    const speak = (response) => {
        if ("speechSynthesis" in window) {
            const utterance = new SpeechSynthesisUtterance(response);
            utterance.rate = 1;
            utterance.pitch = 1;
            utterance.volume = 1; 
            utterance.lang = "hi-GB";
            speechSynthesis.speak(utterance);
        }
    };

    // Effect to scroll
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    // Toggle voice mode
    const toggleVoiceMode = () => {
        setIsVoiceMode(true);
        startVoiceInput();
    };

    // Close voice mode
    const closeVoiceMode = () => {
        setIsVoiceMode(false);
        stopVoiceInput();
    };

    return (
        <>
            {/* ======= Voice Mode UI ========== */}
            {isVoiceMode ? (
                <div className="voice-mode">
                    <div className="voice-animation">
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                    <div className="close-button" onClick={closeVoiceMode}>
                        <i className="ri-close-line"></i>{" "}
                    </div>
                </div>
            ) : (
                <>
                    {/* Header section (Render if mgs array is empty) */}
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

                    {/* =============== Chat messages UI ============ */}
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

                    {/* ============ Input section ========= */}
                    <div className="input-section-container">
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder="Start a conversation..."
                                onChange={handleInputChange}
                                onKeyDown={handleUserInputWrapper}
                            />

                            <div className="icons">
                                {!isTyping && (
                                    <>
                                        <i className="ri-links-line"></i>
                                        <i
                                            className="ri-voice-ai-line"
                                            onClick={toggleVoiceMode}
                                        ></i>{" "}
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
