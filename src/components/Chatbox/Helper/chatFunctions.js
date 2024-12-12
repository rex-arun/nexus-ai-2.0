import { generateBotResponse } from './utils'; // Importing the generateBotResponse function

export const handleUserInput = async (event, messages, setMessages, setIsTyping, setChatStarted, isVoiceMode, speak) => {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
        const userMessage = event.target.value.trim();


        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "user", text: userMessage },
        ]);
        // Only add the user message to the messages state once
        const botResponses = await generateBotResponse(userMessage); // Get bot's response

        setMessages((prevMessages) => [
            ...prevMessages,
            // { text: userMessage, sender: "user" }, // Add user message
            ...botResponses.map(response => ({ text: response, sender: "bot" })), // Add bot responses
        ]);

        event.target.value = "";
        setIsTyping(false);
        setChatStarted(true);

        if (isVoiceMode) {
            speak(botResponses.join(" ")); // Speak the concatenated bot responses
        }
    }
};

export const handleVoiceInput = async (event, setMessages, speak, setChatStarted) => {
    const transcript =
        event.results[event.resultIndex][0].transcript.toLowerCase();

    if (event.results[event.resultIndex].isFinal) {
        const botResponses = await generateBotResponse(transcript); // Get bot's response
        setChatStarted(true);

        setMessages((prevMessages) => [
            ...prevMessages,
            { text: transcript, sender: "user" },
            ...botResponses.map(response => ({ text: response, sender: "bot" })), // Map responses to messages
        ]);

        speak(botResponses.join(" ")); // Ensure bot response is spoken as well
    }
};
