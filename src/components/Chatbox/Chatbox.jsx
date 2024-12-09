import React, { useState } from 'react';
import './Chatbox.css';

export default function Chatbox() {
    const [isTyping, setIsTyping] = useState(false);

    // Function to handle input change
    const handleInputChange = (event) => {
        // Check if the input is not empty and update state accordingly
        if (event.target.value.trim() !== "") {
            setIsTyping(true); 
        } else {
            setIsTyping(false); 
        }
    };

    return (
        <>
            <h1>
                What's on Your Mind<br />I'm Here to Help...
            </h1>

            {/* Prompts section */}
            <div className="promt">
                <div className="promt1">
                    <p>Help me on my Project Report.</p>
                </div>
                <div className="promt2">
                    <p>Plan a Road Trip with friends.</p>
                </div>
                <div className="promt3">
                    <p>How can I prepare for a technical associate interview?</p>
                </div>
            </div>

            {/* Input section */}
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Start a conversation..."
                    onChange={handleInputChange}
                />

                {/* Icons section */}
                <div className="icons">
                    {!isTyping && (
                        <>
                            <i className="ri-links-line"></i>
                            <i className="ri-voice-ai-line"></i>
                        </>
                    )}

                    {/* Show the send icon when the user is typing */}
                    {isTyping && (
                        <div className="typing-indicator">
                            <i className="ri-send-plane-fill"></i> 
                        </div>
                    )}
                </div>
            </div>

            {/* Acknowledgement section */}
            <div className="acknowledge">
                <p>
                    NexusAI can make mistakes, double-check important stuff
                </p>
            </div>
        </>
    );
}
