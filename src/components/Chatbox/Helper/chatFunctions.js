import { generateBotResponse } from './utils';  

// ============= Chat Output ===============
export const handleUserInput = (
    event,
    messages,
    setMessages,
    setIsTyping,
    setChatStarted,
    isVoiceMode,
    speak
) => {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
        const userMessage = event.target.value.trim();

        const botResponse = generateBotResponse(userMessage);  // Get bot's response

        setMessages([
            ...messages,
            { text: userMessage, sender: "user" },
            { text: botResponse, sender: "bot" },
        ]);
        event.target.value = "";
        setIsTyping(false);
        setChatStarted(true);

        if (isVoiceMode) {
            speak(botResponse);
        }
    }
};



// ============= Voice Output ===============
export const handleVoiceInput = (
    event,
    setMessages,
    speak,
    setChatStarted
) => {
    const transcript =
        event.results[event.resultIndex][0].transcript.toLowerCase();

    if (event.results[event.resultIndex].isFinal) {
        const botResponse = generateBotResponse(transcript);  // Get bot's response
        setChatStarted(true);
        
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: transcript, sender: "user" },
            { text: botResponse, sender: "bot" },
        ]);

        speak(botResponse);  // Ensure bot response is spoken as well
    }
};
