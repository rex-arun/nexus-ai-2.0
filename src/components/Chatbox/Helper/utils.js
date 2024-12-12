import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateBotResponse = async (message) => {
    const userMessage = message.toLowerCase();

    // ============== Small Talk =================
    if (
        userMessage.includes("hello") ||
        userMessage.includes("hey") ||
        userMessage.includes("hi there") ||
        userMessage == "hi"
    ) {
        return ["Hello! How can I help you?"];
    } else if (userMessage.includes("how are you")) {
        const responses = [
            "I'm doing great, thanks for asking! How about you?",
            "I'm just a bunch of code, but I’m feeling awesome! How are you?",
            "I'm functioning at full capacity, ready to assist you! How are you?",
        ];
        return [responses[Math.floor(Math.random() * responses.length)]];
    } else if (
        userMessage.includes("what's up") ||
        userMessage.includes("what is up")
    ) {
        const responses = [
            "Not much, just here to help you out! What's up with you?",
            "Just hanging out in the cloud, you know. What's going on?",
            "I'm always up, ready to assist. How can I help today?",
        ];
        return [responses[Math.floor(Math.random() * responses.length)]];
    }

    // ============== Weather Functioning ====================
    else if (
        userMessage.includes("weather") ||
        userMessage.includes("temperature") ||
        userMessage.includes("rain") ||
        userMessage.includes("climate") ||
        userMessage.includes("forecast") ||
        userMessage.includes("radar") ||
        userMessage.includes("cloud")
    ) {
        const apiKey = "9cae3805331d347f02493199ce5e540f";

        // Getting city name
        let location;
        if (userMessage.includes("of")) {
            location = userMessage.split(" of ")[1]?.trim();
        } else if (userMessage.includes("in")) {
            location = userMessage.split(" in ")[1]?.trim();
        } else if (userMessage.includes("at")) {
            location = userMessage.split(" at ")[1]?.trim();
        }

        // Responses
        let responses = [];

        // If input format is correct
        if (location) {
            // Trying to fetch API
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`);
                const data = await response.json();

                // If response is valid
                if (data.cod === 200) {
                    const temp = data.main.temp;
                    const weatherCondition = data.weather[0].description;

                    responses.push(`Weather in ${data.name} is ${weatherCondition} and the temperature is ${temp}°C`);
                } else {
                    responses.push(`Sorry, I'm unable to find weather update for ${location}`);
                }
            } catch (error) {
                responses.push(`Something went wrong. Please try again later.`);
            }
        } else {
            responses.push(`Please provide a location.`);
        }

        return responses; // Ensure to return the responses after the fetch call
    }

    // ==================== Joke part =======================
    else if (userMessage.includes("joke")) {
        let responses = [];
        // Trying to fetch API
        try {
            const response = await fetch(`https://icanhazdadjoke.com/slack`);
            const data = await response.json();
            // If response is valid
            responses.push(`${data.attachments[0].text}`);
        } catch (error) {
            responses.push(`Something went wrong. Please try again later.`);
        }

        return responses;
    }

    // =================== Else part =======================
    else {
        // ======= Gemini Model =============

        let responses = [];
        let resultText;

        async function tasks() {
            console.log(userMessage);
            const genAI = new GoogleGenerativeAI(
                "AIzaSyBFbh1m-8HNU0nW3s-wH2g34QEzwxXYgdI"
            );
            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-flash",
            });

            const prompt = userMessage;
            const result = await model.generateContent(
                `Your Prompt is: ${prompt} || Remember this thing: 1. We are using your API, so for our service try to generate output under 50 words if possible and you can increase if necessary. 2. You are a chat bot not an API, also do text formatting, don't add * and other symbols without meaning. 3. Don't include your personal information I provided to you if user didn't ask about it`
            );
            resultText = result.response.text();
            console.log(resultText);
            responses.push(`${resultText}`);
        }

        await tasks(); // Ensure to await the tasks function
        return responses;
    }
};
