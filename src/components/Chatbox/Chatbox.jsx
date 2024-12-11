import React, { useState, useEffect, useRef } from "react";
import "./Chatbox.css";
import "./Chatbox2.css";

export default function Chatbox() {
    const [isTyping, setIsTyping] = useState(false);
    const [selectedPrompt, setSelectedPrompt] = useState(null);
    const [messages, setMessages] = useState([]);
    const [chatStarted, setChatStarted] = useState(false);
    const [isVoiceMode, setIsVoiceMode] = useState(false); // New state for voice mode
    const [isListening, setIsListening] = useState(false); // State for checking if speech input is active

    const chatContainerRef = useRef(null);

    const recognition = useRef(null); // Ref to hold speech recognition instance

    // Initialize speech recognition API if available
    useEffect(() => {
        if ("webkitSpeechRecognition" in window) {
            recognition.current = new window.webkitSpeechRecognition();
            recognition.current.continuous = true;
            recognition.current.interimResults = true;
            recognition.current.lang = "en-US";

            recognition.current.onstart = () => setIsListening(true);
            recognition.current.onend = () => setIsListening(false);
            recognition.current.onresult = handleVoiceInput;
        }
    }, []);

    // Function to handle input change
    const handleInputChange = (event) => {
        if (event.target.value.trim() !== "") {
            setIsTyping(true);
        } else {
            setIsTyping(false);
        }
    };

    // Function to handle user input
    const handleUserInput = (event) => {
        if (event.key === "Enter" && event.target.value.trim() !== "") {
            const userMessage = event.target.value.trim().toLowerCase();
            let botResponse = "";

            // Handle various responses
            if (
                userMessage.includes("hello") ||
                userMessage.includes("hey") ||
                userMessage.includes("hi")
            ) {
                botResponse = "Hello! How can I help you?";
            } else if (userMessage.includes("how are you")) {
                const responses = [
                    "I'm doing great, thanks for asking! How about you?",
                    "I'm just a bunch of code, but I’m feeling awesome! How are you?",
                    "I'm functioning at full capacity, ready to assist you! How are you?",
                ];
                botResponse =
                    responses[Math.floor(Math.random() * responses.length)];
            } else if (
                userMessage.includes("what's up") ||
                userMessage.includes("what is up")
            ) {
                const responses = [
                    "Not much, just here to help you out! What's up with you?",
                    "Just hanging out in the cloud, you know. What's going on?",
                    "I'm always up, ready to assist. How can I help today?",
                ];
                botResponse =
                    responses[Math.floor(Math.random() * responses.length)];
            } else {
                botResponse = "I didn't understand that.";
            }

            setMessages([
                ...messages,
                { text: userMessage, sender: "user" },
                { text: botResponse, sender: "bot" },
            ]);
            event.target.value = "";
            setIsTyping(false);
            setChatStarted(true);

            // Only speak if in voice mode
            if (isVoiceMode) {
                speak(botResponse);
            }
        }
    };

    // Function to handle voice input when recognition results are available
    // Function to handle voice input when recognition results are available
    const handleVoiceInput = (event) => {
        const transcript =
            event.results[event.resultIndex][0].transcript.toLowerCase();
        if (event.results[event.resultIndex].isFinal) {
            let botResponse = "";

            if (
                transcript.includes("hello") ||
                transcript.includes("hey") ||
                transcript.includes("hi")
            ) {
                botResponse = "Hello! How can I help you?";
            } else if (transcript.includes("how are you")) {
                const responses = [
                    "I'm doing great, thanks for asking! How about you?",
                    "I'm just a bunch of code, but I’m feeling awesome! How are you?",
                    "I'm functioning at full capacity, ready to assist you! How are you?",
                ];
                botResponse =
                    responses[Math.floor(Math.random() * responses.length)];
            } else if (
                transcript.includes("what's up") ||
                transcript.includes("what is up")
            ) {
                const responses = [
                    "Not much, just here to help you out! What's up with you?",
                    "Just hanging out in the cloud, you know. What's going on?",
                    "I'm always up, ready to assist. How can I help today?",
                ];
                botResponse =
                    responses[Math.floor(Math.random() * responses.length)];
            } else {
                botResponse = "I didn't understand that.";
            }

            // Add both user and bot messages to the state, preserving previous messages
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: transcript, sender: "user" },
                { text: botResponse, sender: "bot" },
            ]);

            speak(botResponse); // Ensure bot response is spoken as well
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

    // Function to speak the bot's response
    const speak = (response) => {
        if ("speechSynthesis" in window) {
            const utterance = new SpeechSynthesisUtterance(response);
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

    // Function to toggle voice mode
    const toggleVoiceMode = () => {
        setIsVoiceMode(true);
        startVoiceInput(); // Start listening for voice input when voice mode is activated
    };

    // Function to close voice mode
    const closeVoiceMode = () => {
        setIsVoiceMode(false);
        stopVoiceInput(); // Stop voice input when voice mode is closed
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
                        <i className="ri-close-line"></i>{" "}
                        {/* Cross icon to close */}
                    </div>
                </div>
            ) : (
                <>
                    {/* Header section is conditionally rendered */}
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

                    {/* Chat messages */}
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

                    {/* Input section */}
                    <div className="input-section-container">
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder="Start a conversation..."
                                onChange={handleInputChange}
                                onKeyDown={handleUserInput}
                            />

                            <div className="icons">
                                {!isTyping && (
                                    <>
                                        <i className="ri-links-line"></i>
                                        <i
                                            className="ri-voice-ai-line"
                                            onClick={toggleVoiceMode}
                                        ></i>{" "}
                                        {/* Add click handler to start voice mode */}
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
