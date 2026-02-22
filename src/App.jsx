import { useState } from "react";
import "./App.css";
import Chatbox from "./components/Chatbox/Chatbox";
import Home from "./components/Home/Home";
import { ChatProvider } from "./components/Chatbox/ChatContext";
import ShareIcon from "./components/Shareicon/ShareIcon";

function App() {
    const [showIcons, setShowIcons] = useState(false);
    const [isChatStarted, setIsChatStarted] = useState(false); // State to toggle between Home and ChatWindowUI

    const toggleIcons = () => {
        setShowIcons(!showIcons);
    };

    const handleMouseEnter = () => {
        setShowIcons(true);
    };

    const handleMouseLeave = () => {
        setShowIcons(false);
    };

    // Handle Get Started button click to start the chat
    const handleGetStarted = () => {
        setIsChatStarted(true); // Update state to show ChatWindowUI
    };

    // Handle Home icon click to go back to the home page
    const handleGoHome = () => {
        setIsChatStarted(false); // Update state to show Home component
    };

    return (
        <ChatProvider>
            <div className="App">
                {/* Show Home by default */}
                {!isChatStarted ? (
                    <Home onGetStarted={handleGetStarted} />
                ) : (
                    <Chatbox />
                )}

                {/* ======== Settings ======== */}
                <div
                    className="settings-icon"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <i className="ri-settings-2-line"></i>
                </div>
                {showIcons && (
                    <div
                        className="additional-icons"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* Home icon with click handler */}
                        <i
                            className="ri-home-line"
                            title="Home"
                            onClick={handleGoHome}
                        ></i>
                        {/* <i className="ri-moon-line" title="Theme"></i> */}
                        <ShareIcon />
                    </div>
                )}
            </div>
        </ChatProvider>
    );
}

export default App
