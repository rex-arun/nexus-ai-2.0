import React, { useState, useEffect, useRef } from "react";
import { handleUserInput, handleVoiceInput } from "./Helper/chatFunctions";
import "remixicon/fonts/remixicon.css";
import "./Chatbox.css";
import "./Chatbox2.css";

export default function Chatbox() {
    const [isTyping, setIsTyping] = useState(false);
    const [selectedPrompt, setSelectedPrompt] = useState(null);
    const [messages, setMessages] = useState([]);
    const [chatStarted, setChatStarted] = useState(false);
    const [isVoiceMode, setIsVoiceMode] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState("");
    const chatContainerRef = useRef(null);
    const recognition = useRef(null);
    const lastBotResponse = useRef(""); // Store the last bot response
    const [isMicOn, setIsMicOn] = useState(false);

    // ========= Initialize speech recognition API ==========
    useEffect(() => {
        if ("webkitSpeechRecognition" in window) {
            recognition.current = new window.webkitSpeechRecognition();
            recognition.current.continuous = true;
            recognition.current.interimResults = true;
            recognition.current.lang = "en-US";

            recognition.current.onstart = () => setIsListening(true);
            recognition.current.onend = () => setIsListening(false);
            recognition.current.onresult = (event) => {
                handleVoiceInput(
                    event,
                    setMessages,
                    speak,
                    setChatStarted,
                    lastBotResponse
                );
                // Remove the stopVoiceInput call to keep listening
                // stopVoiceInput();

                if (chatContainerRef.current) {
                    chatContainerRef.current.scrollTop =
                        chatContainerRef.current.scrollHeight;
                }
            };
        }
    }, []);

    // Spacebar triggering the mic
    useEffect(() => {
        const handleSpacebarPress = (event) => {
            if (isVoiceMode && event.code === "Space") {
                startVoiceInput();
            }
        };

        window.addEventListener("keydown", handleSpacebarPress);

        return () => {
            window.removeEventListener("keydown", handleSpacebarPress);
        };
    }, [isVoiceMode]);

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
        if (event.key === "Enter") {
            const inputValue = event.target.value.trim();
            sendMessage(inputValue);
        }
    };

    // =========== Send Input to Voice / Text / Image functions =============
    const sendMessage = async (inputValue) => {
        if (inputValue.trim() === "") return;

        setChatStarted(true);

        if (inputValue.startsWith("image/prompt:")) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: "user", text: inputValue },
            ]);

            const prompt = inputValue.replace("image/prompt:", "").trim();

            setInputValue("");

            // Add a message with a loading animation
            const loadingMessage = {
                sender: "bot",
                text: "Generating image...",
            };
            setMessages((prevMessages) => [...prevMessages, loadingMessage]);

            try {
                // API call to generate image
                const imageUrl = await generateImage(prompt);
                if (imageUrl) {
                    // Replace loading message with the generated image
                    setMessages((prevMessages) => [
                        ...prevMessages.slice(0, -1),
                        {
                            sender: "bot",
                            text: `Here's the image:`,
                            imageUrl: imageUrl,
                        },
                    ]);
                } else {
                    setMessages((prevMessages) => [
                        ...prevMessages.slice(0, -1),
                        {
                            sender: "bot",
                            text: "Sorry, I couldn't generate the image.",
                        },
                    ]);
                }
            } catch (error) {
                setMessages((prevMessages) => [
                    ...prevMessages.slice(0, -1),
                    { sender: "bot", text: "Error generating image." },
                ]);
                console.error("Error generating image:", error);
            }
        } else {
            // Call handleUserInput without adding the user message here
            handleUserInput(
                { key: "Enter", target: { value: inputValue } },
                messages,
                setMessages,
                setIsTyping,
                setChatStarted,
                isVoiceMode,
                speak
            );
        }

        setInputValue("");
        setIsTyping(false);
    };

    // Hugging Face API Call(Text to Image)
    const generateImage = async (prompt) => {
        const token = "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"; // Make sure to set your token here
        const response = await fetch(
            "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ inputs: prompt }),
            }
        );

        if (response.ok) {
            const result = await response.blob();
            const imageUrl = URL.createObjectURL(result);
            return imageUrl;
        } else {
            console.error("Error generating image:", response.status);
            return null;
        }
    };

    // Download the image
    const downloadImage = (url) => {
        const link = document.createElement("a");
        link.href = url;
        link.download = "nexa-image.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const startVoiceInput = () => {
        if (recognition.current) {
            recognition.current.start();
            setIsMicOn(true); // Set mic state to on
        }
    };

    const stopVoiceInput = () => {
        if (recognition.current) {
            recognition.current.stop();
            setIsMicOn(false); // Set mic state to off
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
    }, [messages, isVoiceMode]);

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
                <div className={`voice-mode ${isMicOn ? "active" : ""}`}>
                    <div className="voice-animation">
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                    <div className="close-button" onClick={closeVoiceMode}>
                        <i className="ri-close-line"></i>{" "}
                    </div>
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
                                className={`message ${message.sender} ${
                                    message.className || ""
                                }`}
                            >
                                {message.isLoading ? (
                                    <div className="loading-dots">
                                        <span className="dot"></span>
                                        <span className="dot"></span>
                                        <span className="dot"></span>
                                    </div>
                                ) : (
                                    <p>{message.text}</p>
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
                                            <i className="ri-download-fill"></i>
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
                                                sendMessage(inputValue); // Call sendMessage with the input value
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
}
