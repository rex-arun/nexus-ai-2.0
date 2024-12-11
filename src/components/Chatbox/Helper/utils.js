export const generateBotResponse = (message) => {
    const userMessage = message.toLowerCase();

    // ============== Small Talk =================
    if (
        userMessage.includes("hello") ||
        userMessage.includes("hey") ||
        userMessage.includes("hi")
    ) {
        return "Hello! How can I help you?";
    }
    else if (userMessage.includes("how are you")) {
        const responses = [
            "I'm doing great, thanks for asking! How about you?",
            "I'm just a bunch of code, but I’m feeling awesome! How are you?",
            "I'm functioning at full capacity, ready to assist you! How are you?",
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
    else if (
        userMessage.includes("what's up") ||
        userMessage.includes("what is up")
    ) {
        const responses = [
            "Not much, just here to help you out! What's up with you?",
            "Just hanging out in the cloud, you know. What's going on?",
            "I'm always up, ready to assist. How can I help today?",
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
    else {
        return "I didn't understand that.";
    }
};
