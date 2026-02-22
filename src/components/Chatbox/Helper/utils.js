import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateBotResponse = async (message, isVoiceMode = false) => {
    const userMessage = message.toLowerCase().replace(/nexa/g, "").trim();

    if (userMessage.includes("stop") || userMessage.includes("shut up")) {
        // Stop the speech synthesis immediately
        window.speechSynthesis.cancel();
        response = "Speech stopped.";
        return response;
    }

    // ============== Small Talk =================
    if (
        userMessage.includes("hello") ||
        userMessage.includes("hey") ||
        userMessage.includes("hi there") ||
        userMessage == "hi"
    ) {
        return ["Hello! How can I help you"];
    } else if (userMessage.includes("how are you")) {
        const responses = [
            "I'm doing great, thanks for asking! How about you?",
            "I'm just a bunch of code, but I’m feeling awesome!",
            "I'm functioning at full capacity, ready to assist you!",
        ];
        return [responses[Math.floor(Math.random() * responses.length)]];
    } else if (
        userMessage.includes("are you human") ||
        userMessage.includes("are you a human")
    ) {
        const responses = [
            "I wish I could be, but nope, I’m just a bunch of code!",
            "Nope, I'm an AI assistant here to help you out!",
            "I’m not human, but I can chat like one! Does that count?",
        ];
        return [responses[Math.floor(Math.random() * responses.length)]];
    } else if (
        userMessage.includes("you are awesome") ||
        userMessage.includes("you are great")
    ) {
        const responses = [
            "You're pretty awesome yourself! Thanks for being so cool.",
            "Thank you! You're amazing too!",
            "You're the best! I'm just here to help out.",
        ];
        return [responses[Math.floor(Math.random() * responses.length)]];
    } else if (
        userMessage.includes("your name") ||
        userMessage.includes("what is your name")
    ) {
        const responses = [
            "I’m Nexa, your friendly assistant! How can I help you today?",
            "My name is Nexa, but I’m happy to go by anything you like!",
            "I’m Nexa, your chatbot assistant. Nice to meet you!",
        ];
        return [responses[Math.floor(Math.random() * responses.length)]];
    } else if (
        userMessage.includes("can you do") ||
        userMessage.includes("you can do")
    ) {
        const responses = [
            "I can help with answering questions, chatting, and providing information!",
            "I’m here to assist with whatever you need—just ask away!",
            "I can help with a variety of tasks, from answering questions to providing information and more!",
        ];
        return [responses[Math.floor(Math.random() * responses.length)]];
    } else if (
        userMessage.includes("who are you") ||
        userMessage.includes("what are you")
    ) {
        return ["I am a chat assistant with Artificial Intelligence"];
    }

    // ========================== Small Game Feature ==========================
    else if (
        userMessage.includes("play a game") ||
        userMessage.includes("play game")
    ) {
        return [
            "Available games: <br/> •  Rock Paper Seissors <br/> • Tic Tac Toe <br/> • Snake Game <br/>Just type 'play game_name' to start playing...",
        ];
    }

    // ============== Weather Functioning ====================
    else if (
        userMessage.includes("weather") ||
        userMessage.includes("temperature") ||
        userMessage.includes("climate") ||
        userMessage.includes("forecast")
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

        let responses = [];

        if (location) {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
                );
                const data = await response.json();

                if (data.cod === 200) {
                    const temp = data.main.temp;
                    const weatherCondition = data.weather[0].description;

                    responses.push(
                        `Weather in ${data.name} is ${weatherCondition} and the temperature is ${temp}°C`
                    );
                } else {
                    responses.push(
                        `Sorry, I'm unable to find weather update for ${location}`
                    );
                }
            } catch (error) {
                responses.push(`Something went wrong. Please try again later.`);
            }
        } else {
            responses.push(`Please provide a location.`);
        }

        return responses;
    }

    // ===================== News =====================
    else if (
        userMessage.includes("news") ||
        userMessage.includes("headlines") ||
        userMessage.includes("announcements")
    ) {
        let topic;

        if (userMessage.includes("about")) {
            topic = userMessage.split(" about ")[1]?.trim();
        } else if (userMessage.includes("on")) {
            topic = userMessage.split(" on ")[1]?.trim();
        } else if (userMessage.includes("of")) {
            topic = userMessage.split(" of ")[1]?.trim();
        } else if (userMessage.includes("for")) {
            topic = userMessage.split(" for ")[1]?.trim();
        }

        const apiKey = "24eed314516a4d21a01f8eb51a26c3b1";
        let responses = [];
        let output = [];

        async function fetchNews(query = "latest") {
            const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
            try {
                const response = await fetch(url);
                const data = await response.json();

                if (data.status === "ok" && data.articles.length > 0) {
                    data.articles.forEach((article) => {
                        if (article.description) {
                            if (article.description != "[Removed]") {
                                output.push(article.description);
                            }
                        }
                    });

                    if (output.length > 0) {
                        let news =
                            output[Math.floor(Math.random() * output.length)];
                        responses.push(news);
                    } else {
                        responses.push("No news found for your query.");
                    }
                } else {
                    responses.push("No news found for your query.");
                }
            } catch (error) {
                responses.push("Something went wrong, Please try again later");
            }
        }

        await fetchNews(topic || "latest");

        return responses;
    }

    // ==================== Joke part =======================
    else if (userMessage.includes("joke") || userMessage.includes("funny")) {
        let responses = [];
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

    // ============== Time Function ====================
    else if (userMessage.includes("time")) {
        let time = new Date().toLocaleString(undefined, {
            hour: "numeric",
            minute: "numeric",
        });
        return [`The current time is ${time}`];
    }

    // ============== Date Function ====================
    else if (
        userMessage.includes("date") ||
        userMessage.includes("today") ||
        userMessage.includes("tarikh")
    ) {
        let date = new Date().toLocaleString(undefined, {
            day: "numeric",
            month: "short",
        });
        return [`The current date is ${date}`];
    }

    // ============== Calculation ====================
    else if (
        userMessage.match(/(what is|calculate)?\s*\d+(\s*[\+\-\*\/\sx]\s*\d+)+/)
    ) {
        let cleanCommand = userMessage
            .replace(/(what is|calculate)/, "")
            .trim();

        // Replace 'x' with '*' for multiplication
        cleanCommand = cleanCommand.replace(/\s*x\s*/, "*");

        let operands = cleanCommand.split(/\s*[\+\-\*\/]\s*/);
        let operators = cleanCommand.match(/[\+\-\*\/]/g);

        let result = parseFloat(operands[0]);

        for (let i = 1; i < operands.length; i++) {
            let num = parseFloat(operands[i]);
            if (isNaN(num)) {
                result = "Invalid number input!";
                break;
            }
            switch (operators[i - 1]) {
                case "+":
                    result += num;
                    break;
                case "-":
                    result -= num;
                    break;
                case "*":
                    result *= num;
                    break;
                case "/":
                    if (num === 0) {
                        result = "Division by zero is not allowed!";
                    } else {
                        result /= num;
                    }
                    break;
                default:
                    result = "Sorry, I couldn't process the calculation.";
            }
        }

        return [`The result is ${result}`];
    }

    // ============== Reminder Functions ====================
    // Add Reminder
    else if (
        (userMessage.includes("add") && userMessage.includes("reminder")) ||
        (userMessage.includes("set") && userMessage.includes("reminder")) ||
        (userMessage.includes("create") && userMessage.includes("reminder"))
    ) {
        const reminderText = userMessage.match(/reminder\s(.+)/i)?.[1]?.trim();
        let response = [];

        if (reminderText) {
            // Save the reminder to local storage
            let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
            reminders.push(reminderText);
            localStorage.setItem("reminders", JSON.stringify(reminders));

            response.push(`Reminder added: "${reminderText}"`);
        } else {
            response.push("Please specify what you want to be reminded about.");
        }
        return response;
    }

    // Show Reminders
    else if (
        (userMessage.includes("show") && userMessage.includes("reminders")) ||
        (userMessage.includes("tell") &&
            userMessage.includes("my reminders")) ||
        userMessage.includes("what are my reminders")
    ) {
        // Fetch reminders from local storage
        const reminders = JSON.parse(localStorage.getItem("reminders")) || [];
        let response = [];

        if (reminders.length > 0) {
            const rems = reminders
                .map((reminder, index) => `${index + 1}. ${reminder}`)
                .join("\n");
            response.push(`You have the following reminders:\n${rems}`);
        } else {
            response.push("You have no reminders.");
        }

        return response;
    }

    // Delete all reminders
    else if (
        userMessage.includes("delete all reminders") ||
        userMessage.includes("clear all reminders")
    ) {
        // Clear all reminders from local storage
        localStorage.removeItem("reminders");
        return ["All reminders have been deleted."];
    }

    // Delete a specific reminder
    else if (
        userMessage.includes("delete reminder") ||
        userMessage.includes("remove reminder")
    ) {
        // Fetch reminders from local storage
        let reminders = JSON.parse(localStorage.getItem("reminders")) || [];

        if (reminders.length > 0) {
            // Extract the number from the userMessage
            const match = userMessage.match(/\d+/);
            if (match) {
                const index = parseInt(match[0], 10) - 1; // Convert to zero-based index
                if (index >= 0 && index < reminders.length) {
                    const deletedReminder = reminders.splice(index, 1);
                    localStorage.setItem(
                        "reminders",
                        JSON.stringify(reminders)
                    );
                    return [`Deleted reminder: "${deletedReminder}"`];
                } else {
                    return ["Invalid reminder number. Please try again."];
                }
            } else {
                return ["Please specify which reminder to delete by number."];
            }
        } else {
            return ["You have no reminders to delete."];
        }
    }

    // =============== General Query ==================
    else if (
        userMessage.startsWith("who is") ||
        userMessage.startsWith("who was") ||
        userMessage.startsWith("what is") ||
        userMessage.startsWith("tell me about") ||
        userMessage.startsWith("explain") ||
        userMessage.startsWith("give me a brief") ||
        userMessage.startsWith("show me")
    ) {
        let query = userMessage
            .replace(
                /^(who\s*(is|was|are)|what\s*(is|are)|tell\s*me\s*about|define|explain|give\s*me\s*a\s*brief|show\s*me)\s+/i,
                ""
            )
            .trim();

        const apiUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(
            query
        )}&format=json&no_html=1`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.AbstractText) {
                return [data.AbstractText];
            } else {
                return [
                    `I couldn't find specific information about "${query}". Please try rephrasing your query.`,
                ];
            }
        } catch (error) {
            return [
                "Something went wrong while fetching information. Please try again later.",
            ];
        }
    }

    // =================== Else part (Gemini) =======================
    else {
        let responses = [];
        let resultText;

        async function tasks() {

            // console.log(userMessage);
            API_KEY=import.meta.env.VITE_Gemini_API_KEY;

            const genAI = new GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({
                model: "gemini-2.5-flash",
            });

            const prompt = userMessage;

            let result;

            // Short reply for voice-mode
            if (isVoiceMode) {
                result = await model.generateContent(
                    `My prompt: ${prompt} || Remember this thing: 1. Generate output under 30 words if possible and you can increase if necessary. 2. If you dont understand my questions just reply "Please try to rephrasing your query".`
                );
            }
            else {
                result = await model.generateContent(`${prompt}`);
            }

            resultText = result.response.text();
            if (resultText.includes("try to rephrasing your query")) {
                responses.push("Please try to rephrase your query.");
            } else {
                responses.push(`${resultText}`);
            }
        }

        await tasks();
        return responses;
    }
};