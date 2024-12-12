import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateBotResponse = async (message) => {
    const userMessage = message.toLowerCase();

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
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
                );
                const data = await response.json();

                // If response is valid
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
        // Clean the command by removing unnecessary words like "what is" or "calculate"
        let cleanCommand = userMessage
            .replace(/(what is|calculate)/, "")
            .trim();

        // Replace 'x' with '*' for multiplication
        cleanCommand = cleanCommand.replace(/\s*x\s*/, "*"); // Handle spaces around 'x'

        // Now handle multiple operations
        // Replace spaces around operators and split by operator
        let operands = cleanCommand.split(/\s*[\+\-\*\/]\s*/); // Get numbers
        let operators = cleanCommand.match(/[\+\-\*\/]/g); // Get operators (+, -, *, /)

        // Initialize result with the first number
        let result = parseFloat(operands[0]);

        // Apply operations one by one
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
    else if (
        (userMessage.includes("add") && userMessage.includes("reminder")) ||
        (userMessage.includes("set") && userMessage.includes("set reminder")) ||
        (userMessage.includes("create") && userMessage.includes("reminder"))
    ) {
        // Extract reminder text after the keyword
        const reminderText = userMessage.match(/reminder\s(.+)/i)?.[1]?.trim();

        if (reminderText) {
            // Save the reminder to local storage
            let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
            reminders.push(reminderText);
            localStorage.setItem("reminders", JSON.stringify(reminders));

            const response = `Reminder added: "${reminderText}"`;
            appendMessage("assistant", response);
            speak(response);
        } else {
            const response =
                "Please specify what you want to be reminded about.";
            appendMessage("assistant", response);
            speak(response);
        }
    } else if (
        (userMessage.includes("show") && userMessage.includes("reminders")) ||
        (userMessage.includes("tell") &&
            userMessage.includes("my reminders")) ||
        userMessage.includes("what are my reminders")
    ) {
        // Fetch reminders from local storage
        const reminders = JSON.parse(localStorage.getItem("reminders")) || [];

        if (reminders.length > 0) {
            const response = reminders
                .map((reminder, index) => `${index + 1}. ${reminder}`)
                .join("\n");
            const assistantResponse = `You have the following reminders:\n${response}`;
            appendMessage("assistant", assistantResponse);
            speak(assistantResponse);
        } else {
            const response = "You have no reminders.";
            appendMessage("assistant", response);
            speak(response);
        }
    } else if (
        userMessage.includes("delete all reminders") ||
        userMessage.includes("clear all reminders")
    ) {
        // Clear all reminders from local storage
        localStorage.removeItem("reminders");

        const response = "All reminders have been deleted.";
        appendMessage("assistant", response);
        speak(response);
    } else if (
        userMessage.includes("delete reminder") ||
        userMessage.includes("remove reminder")
    ) {
        // Fetch reminders from local storage
        let reminders = JSON.parse(localStorage.getItem("reminders")) || [];

        if (reminders.length > 0) {
            // Extract the number from the command
            const match = userMessage.match(/\d+/);
            if (match) {
                const index = parseInt(match[0], 10) - 1; // Convert to zero-based index
                if (index >= 0 && index < reminders.length) {
                    const deletedReminder = reminders.splice(index, 1); // Remove the specific reminder
                    localStorage.setItem(
                        "reminders",
                        JSON.stringify(reminders)
                    );
                    const response = `Deleted reminder: "${deletedReminder}"`;
                    appendMessage("assistant", response);
                    speak(response);
                } else {
                    const response =
                        "Invalid reminder number. Please try again.";
                    appendMessage("assistant", response);
                    speak(response);
                }
            } else {
                const response =
                    "Please specify which reminder to delete by number.";
                appendMessage("assistant", response);
                speak(response);
            }
        } else {
            const response = "You have no reminders to delete.";
            appendMessage("assistant", response);
            speak(response);
        }
    }

    // =============== General Query ==================
    else if (
        userMessage.startsWith("who") ||
        userMessage.startsWith("what") ||
        userMessage.startsWith("tell me about") ||
        userMessage.startsWith("define") ||
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
