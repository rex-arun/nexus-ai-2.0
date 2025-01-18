import React, { useState, useEffect, useRef } from "react";
import { handleUserInput, handleVoiceInput } from "./Helper/chatFunctions";
import { useChat } from "./ChatContext";
import "remixicon/fonts/remixicon.css";
import "./Chatbox.css";
import "./Chatbox2.css";
import showToast from "../Helper/showToast";
import generateImage from "../Helper/generateImage";
import ChatWindowUI from "./ChatWindowUI";

export default function Chatbox() {
    const [isTyping, setIsTyping] = useState(false);
    const [selectedPrompt, setSelectedPrompt] = useState(null);
    const { messages, setMessages } = useChat();
    const [chatStarted, setChatStarted] = useState(false);
    const [isVoiceMode, setIsVoiceMode] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState("");
    const chatContainerRef = useRef(null);
    const recognition = useRef(null);
    const lastBotResponse = useRef("");
    const [isMicOn, setIsMicOn] = useState(false);
    const lastMessageRef = useRef(null);

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
            recognition.current.onerror = () => {
                recognition.current.start();
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

    // Effect to scroll
    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        const lastMessage = lastMessageRef.current;

        if (chatContainer && lastMessage) {
            // Get the position of the last message
            const lastMessagePosition = lastMessage.getBoundingClientRect().top;
            const chatContainerPosition =
                chatContainer.getBoundingClientRect().top;

            // Scroll to the position just above the last message
            chatContainer.scrollTop =
                lastMessagePosition -
                chatContainerPosition +
                chatContainer.scrollTop;
        }
    }, [messages, isVoiceMode]);

    // Copy button for Code Block
    useEffect(() => {
        const copyButtons = document.querySelectorAll(".copy-button");
        copyButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
                // Get the <pre> element
                let codeBlock =
                    event.target.previousElementSibling.previousElementSibling;

                if (codeBlock) {
                    const codeText = codeBlock;
                    // console.log("Copying text:", codeText);
                    copyToClipboard(codeText);
                } else {
                    console.error("No <pre> element found.");
                }
            });
        });

        return () => {
            copyButtons.forEach((button) => {
                button.removeEventListener("click", () => {});
            });
        };
    }, [messages]);

    // Copy text to clipboard
    window.copyToClipboard = (text) => {
        navigator.clipboard
            .writeText(text.innerText)
            .then(() => {
                showToast("Code copied to clipboard!");
            })
            .catch((err) => {
                console.error("Failed to copy: ", err);
            });
    };

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

        // Game - Tic Tac Toe
        if (inputValue.toLowerCase().includes("play tic tac") && !isVoiceMode) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: "user", text: inputValue },
                {
                    sender: "bot",
                    text: "Let's play Tic Tac Toe!",
                    isTicTacToe: true,
                },
            ]);
            setInputValue("");
            setIsTyping(false);
            return;
        }

        // Game - Snake Game
        if (inputValue.toLowerCase().includes("play snake") && !isVoiceMode) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: "user", text: inputValue },
                {
                    sender: "bot",
                    text: "Let's play Snake Game!",
                    isSnakeGame: true,
                },
            ]);
            setInputValue("");
            setIsTyping(false);
            return;
        }

        // Game - Rock Paper Scissors
        if (inputValue.toLowerCase().includes("play rock paper") && !isVoiceMode) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: "user", text: inputValue },
                {
                    sender: "bot",
                    text: "Let's play Rock Paper Scissors!",
                    isRockPaperScissors: true,
                },
            ]);
            setInputValue("");
            setIsTyping(false);
            return;
        }

        // Image - Generate image
        if (inputValue.startsWith("image/prompt:")) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: "user", text: inputValue },
            ]);

            const prompt = inputValue.replace("image/prompt:", "").trim();

            setInputValue("");

            const loadingMessage = {
                sender: "bot",
                text: "Generating image...",
            };
            setMessages((prevMessages) => [...prevMessages, loadingMessage]);

            try {
                const imageUrl = await generateImage(prompt);
                if (imageUrl) {
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
        }

        // Chat - Handle voice/text input
        else {
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

    // Download the image
    const downloadImage = (url) => {
        const link = document.createElement("a");
        link.href = url;
        link.download = "nexa-image.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Toggle voice mode
    const startVoiceInput = () => {
        if (recognition.current) {
            recognition.current.start();
            setIsMicOn(true);
        }
    };

    // Stop voice input
    const stopVoiceInput = () => {
        if (recognition.current) {
            recognition.current.stop();
            setIsMicOn(false);
        }
    };

    // Speak the response
    const speak = (response) => {
        if ("speechSynthesis" in window) {
            if (
                response.toLowerCase().includes("stop") ||
                response.toLowerCase().includes("shut up")
            ) {
                window.speechSynthesis.cancel();
                return;
            }

            const utterance = new SpeechSynthesisUtterance(response);
            utterance.rate = 1;
            utterance.pitch = 1;
            utterance.volume = 1;
            utterance.lang = "hi-GB";
            speechSynthesis.speak(utterance);
        }
    };

    // Toggle voice mode
    const toggleVoiceMode = () => {
        setIsVoiceMode(true);
        startVoiceInput();
    };

    // Close voice mode
    const closeVoiceMode = () => {
        setIsVoiceMode(false);
        stopVoiceInput();
        window.speechSynthesis.cancel();
    };

    return (
        <ChatWindowUI
            isVoiceMode={isVoiceMode}
            isMicOn={isMicOn}
            chatStarted={chatStarted}
            messages={messages}
            inputValue={inputValue}
            handleInputChange={handleInputChange}
            handleUserInputWrapper={handleUserInputWrapper}
            sendMessage={sendMessage}
            toggleVoiceMode={toggleVoiceMode}
            closeVoiceMode={closeVoiceMode}
            downloadImage={downloadImage}
            setSelectedPrompt={setSelectedPrompt}
            lastMessageRef={lastMessageRef}
            chatContainerRef={chatContainerRef}
            inputRef={inputRef}
            isTyping={isTyping}
            setInputValue={setInputValue}
            stopVoiceInput={stopVoiceInput}
        />
    );
}