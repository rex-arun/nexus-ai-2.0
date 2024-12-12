import { generateBotResponse } from './utils'; // Importing the generateBotResponse function

export const handleUserInput = async (event, messages, setMessages, setIsTyping, setChatStarted, isVoiceMode, speak) => {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
        const userMessage = event.target.value.trim();

        // Add user message to the state
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "user", text: userMessage },
        ]);

        // Add a loading indicator for the bot's response
        const loadingMessage = { sender: "bot", text: "...", isLoading: true };
        setMessages((prevMessages) => [...prevMessages, loadingMessage]);

        event.target.value = "";
        setIsTyping(false);
        setChatStarted(true);

        try {
            const botResponses = await generateBotResponse(userMessage); // Get bot's response

            // Replace the loading message with actual bot responses
            setMessages((prevMessages) => [
                ...prevMessages.slice(0, -1), // Remove the loading message
                ...botResponses.map((response) => ({ text: response, sender: "bot" })),
            ]);

            if (isVoiceMode) {
                speak(botResponses.join(" ")); // Speak the concatenated bot responses
            }
        } catch (error) {
            console.error("Error generating bot response:", error);
            // Replace loading with an error message
            setMessages((prevMessages) => [
                ...prevMessages.slice(0, -1),
                { sender: "bot", text: "Sorry, something went wrong." },
            ]);
        }
    }
};

export const handleVoiceInput = async (event, setMessages, speak, setChatStarted) => {
    const transcript =
        event.results[event.resultIndex][0].transcript.toLowerCase();

    if (event.results[event.resultIndex].isFinal) {
        // Add user message to the state
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "user", text: transcript },
        ]);

        // Add a loading indicator for the bot's response
        const loadingMessage = { sender: "bot", text: "...", isLoading: true };
        setMessages((prevMessages) => [...prevMessages, loadingMessage]);

        setChatStarted(true);

        try {
            const botResponses = await generateBotResponse(transcript); // Get bot's response

            // Replace the loading message with actual bot responses
            setMessages((prevMessages) => [
                ...prevMessages.slice(0, -1), // Remove the loading message
                ...botResponses.map((response) => ({ text: response, sender: "bot" })),
            ]);

            speak(botResponses.join(" ")); // Ensure bot response is spoken as well
        } catch (error) {
            console.error("Error generating bot response:", error);
            // Replace loading with an error message
            setMessages((prevMessages) => [
                ...prevMessages.slice(0, -1),
                { sender: "bot", text: "Sorry, something went wrong." },
            ]);
        }
    }
};
