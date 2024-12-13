import { generateBotResponse } from './utils'; 
import { getNormalizedString, getSimilarity } from './stringUtils';

export const handleUserInput = async (event, messages, setMessages, setIsTyping, setChatStarted, isVoiceMode, speak) => {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
        const userMessage = event.target.value.trim();

        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "user", text: userMessage },
        ]);

        const loadingMessage = { sender: "bot", text: "", isLoading: true, className: "loading-dots" };
        setMessages((prevMessages) => [...prevMessages, loadingMessage]);

        event.target.value = "";
        setIsTyping(false);
        setChatStarted(true);

        try {
            const botResponses = await generateBotResponse(userMessage); 

            setMessages((prevMessages) => [
                ...prevMessages.slice(0, -1), 
                ...botResponses.map((response) => ({ text: response, sender: "bot" })),
            ]);

            if (isVoiceMode) {
                speak(botResponses.join(" ")); 
            }
        } catch (error) {
            console.error("Error generating bot response:", error);
            setMessages((prevMessages) => [
                ...prevMessages.slice(0, -1),
                { sender: "bot", text: "Sorry, something went wrong." },
            ]);
        }
    }
};

export const handleVoiceInput = async (event, setMessages, speak, setChatStarted, lastBotResponse) => {
    const transcript =
        event.results[event.resultIndex][0].transcript.toLowerCase().trim();

    if (event.results[event.resultIndex].isFinal) {
        const normalizedTranscript = getNormalizedString(transcript);
        console.log("Input:", normalizedTranscript);
        
        const lastResponseNormalized = lastBotResponse.current ? getNormalizedString(lastBotResponse.current) : "";

        // Check similarity using Jaccard similarity
        if (lastResponseNormalized && getSimilarity(normalizedTranscript, lastResponseNormalized) > 0.5) {
            console.log("Ignoring repeated input.");
            return; 
        }

        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "user", text: transcript },
        ]);

        const loadingMessage = { sender: "bot", text: "", isLoading: true, className: "loading-dots" };
        setMessages((prevMessages) => [...prevMessages, loadingMessage]);

        setChatStarted(true);

        try {
            const botResponses = await generateBotResponse(transcript); 

            // Store the last bot response
            lastBotResponse.current = botResponses.join(" ");

            setMessages((prevMessages) => [
                ...prevMessages.slice(0, -1), 
                ...botResponses.map((response) => ({ text: response, sender: "bot" })),
            ]);

            speak(lastBotResponse.current);
            
        } catch (error) {
            console.error("Error generating bot response:", error);
            setMessages((prevMessages) => [
                ...prevMessages.slice(0, -1),
                { sender: "bot", text: "Sorry, something went wrong." },
            ]);
        }
    }
};