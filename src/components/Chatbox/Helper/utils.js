// ==Function to get a joke from JokeAPI==
const getJoke = async () => {
    try {
        const response = await fetch("https://official-joke-api.appspot.com/random_joke"); 
        const data = await response.json(); 
        
        if (data.setup && data.delivery) {
            return `${data.setup} - ${data.delivery}`;
        }
        

        return data.joke;
    } catch (error) {
        console.error("Error fetching joke:", error);
        return "Sorry, I couldn't get a joke at the moment!";
    }
};

// ===Function to get a motivational quote from Quotable API===
const getMotivationalQuote = async () => {
    try {
        const response = await fetch("https://motivational-content.p.rapidapi.com/quotes/4"); 
        const data = await response.json();
        return `"${data.content}" — ${data.author}`;
    } catch (error) {
        console.error("Error fetching motivational quote:", error);
        return "Stay positive! Keep going!";
    }
};

// ==Function to get a riddle from a public API==
const getRiddle = async () => {
    try {
        const response = await fetch("https://riddles-by-api-ninjas.p.rapidapi.com/v1/riddles"); 
        const data = await response.json();
        return `${data.riddle} (Answer: ${data.answer})`;
    } catch (error) {
        console.error("Error fetching riddle:", error);
        return "I couldn't get a riddle at the moment!";
    }
};

// The main function to generate the bot's response
export const generateBotResponse = async (message) => {
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

    // ============== Joke =================
    else if (userMessage.includes("tell me a joke") || userMessage.includes("joke")) {
        const joke = await getJoke();  
        return joke;
    }

    // ============== Motivational =================
    else if (userMessage.includes("tell me a motivational quote") || userMessage.includes("inspire me")) {
        const quote = await getMotivationalQuote();  
        return quote;
    }

    // ============== Riddle =================
    else if (userMessage.includes("tell me a riddle") || userMessage.includes("riddle")) {
        const riddle = await getRiddle(); 
        return riddle;
    }

    else {
        return "I didn't understand that.";
    }
};
