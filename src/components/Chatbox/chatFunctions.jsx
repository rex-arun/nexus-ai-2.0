
export const handleUserInput = (
    event,
    messages,
    setMessages,
    isVoiceMode,
    speak
) => {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
        const userMessage = event.target.value.trim().toLowerCase();
        let botResponse = "";

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

        // Only speak if in voice mode
        if (isVoiceMode) {
            speak(botResponse);
        }
    }
};

export const handleVoiceInput = (
    event,
    messages,
    setMessages,
    speak
) => {
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
