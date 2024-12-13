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
    }
    else if (userMessage.includes("how are you")) {
        const responses = [
            "I'm doing great, thanks for asking! How about you?",
            "I'm just a bunch of code, but I’m feeling awesome!",
            "I'm functioning at full capacity, ready to assist you!",
        ];
        return [responses[Math.floor(Math.random() * responses.length)]];
    }

    // Are you human?
    else if (userMessage.includes("are you human") || userMessage.includes("are you a human")) {
        const responses = [
            "I wish I could be, but nope, I’m just a bunch of code!",
            "Nope, I'm an AI assistant here to help you out!",
            "I’m not human, but I can chat like one! Does that count?",
        ];
        return [responses[Math.floor(Math.random() * responses.length)]];
    }
    
    else if (userMessage.includes("you are awesome") || userMessage.includes("you are great")) {
        const responses = [
            "You're pretty awesome yourself! Thanks for being so cool.",
            "Thank you! You're amazing too!",
            "You're the best! I'm just here to help out."
        ];
        return [responses[Math.floor(Math.random() * responses.length)]];
    }
        
    else if (userMessage.includes("your name") || userMessage.includes("what is your name")) {
        const responses = [
            "I’m Nexa, your friendly assistant! How can I help you today?",
            "My name is Nexa, but I’m happy to go by anything you like!",
            "I’m Nexa, your chatbot assistant. Nice to meet you!"
        ];
        return [responses[Math.floor(Math.random() * responses.length)]];
    }
        
    else if (userMessage.includes("can you do")|| userMessage.includes("you can do")) {
        const responses = [
            "I can help with answering questions, chatting, and providing information!",
            "I’m here to assist with whatever you need—just ask away!",
            "I can help with a variety of tasks, from answering questions to providing information and more!"
        ];
        return [responses[Math.floor(Math.random() * responses.length)]];
    }
        
    else if (
        userMessage.includes("who are you") ||
        userMessage.includes("what are you")
    ) {
        return ["I am a chat assistant with Artificial Intelligence"];
    } 

    // ========================== Small Game Feature ==========================
    // else if (userMessage.includes("play a game")) {
    //     console.log("User wants to play a game"); // Debug: Log game request

    //     const gameOptions = [
    //         "number guessing",
    //         "rock paper scissors",
    //         "tic tac toe",
    //         "trivia challenge",
    //         "word scramble",
    //         "math quiz",
    //         "memory test"
    //     ];

    //     // Default response for showing available games
    //     if (userMessage.includes("play a game")) {
    //         response = `🎮 Let's have some fun! Choose a game to play:\n- ${gameOptions.join("\n- ")}\nType the name of the game to start!`;
    //         return response;
    //     }

    //     // Number Guessing Game
    //     if (userMessage.includes("number guessing")) {
    //         response = `🎲 Let's play a Number Guessing Game!\nI've picked a number between 1 and 100. Try to guess it by typing a number.`;
    //         return response;
    //     }

    //     // Rock Paper Scissors
    //     else if (userMessage.includes("rock paper scissors")) {
    //         const choices = ["rock", "paper", "scissors"];
    //         const botChoice = choices[Math.floor(Math.random() * choices.length)];
    //         response = `✊✋✌️ Let's play Rock-Paper-Scissors!\nType your choice (rock, paper, or scissors), and I'll reveal mine.`;
    //         return response;
    //     }

    //     // Tic Tac Toe
    //     else if (userMessage.includes("tic tac toe")) {
    //         response = `🎮 Let's play Tic Tac Toe!\nUnfortunately, I can't display the board here, but type your moves like 'A1', 'B2', etc., and I'll play along!`;
    //         return response;
    //     }

    //     // Trivia Challenge
    //     else if (userMessage.includes("trivia challenge")) {
    //         const triviaQuestions = [
    //             { question: "What is the capital of France?", answer: "paris" },
    //             { question: "Who wrote 'Romeo and Juliet'?", answer: "shakespeare" },
    //             { question: "What is 8 x 12?", answer: "96" },
    //             { question: "Who painted the Mona Lisa?", answer: "da vinci" },
    //             { question: "What is the largest planet in our solar system?", answer: "jupiter" },
    //             { question: "What is the smallest country in the world?", answer: "vatican city" },
    //             { question: "Which animal is known as the King of the Jungle?", answer: "lion" },
    //             { question: "What is the largest ocean on Earth?", answer: "pacific" },
    //             { question: "Who discovered gravity?", answer: "newton" },
    //             { question: "What is the chemical symbol for gold?", answer: "au" },
    //             { question: "In which year did the Titanic sink?", answer: "1912" },
    //             { question: "What is the hardest natural substance on Earth?", answer: "diamond" },
    //             { question: "Who was the first president of the United States?", answer: "george washington" },
    //             { question: "What is the largest desert in the world?", answer: "sahara" },
    //             { question: "What is the longest river in the world?", answer: "amazon" }
    //         ];
    //         const selectedTrivia = triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)];
    //         response = `🧠 Trivia Time!\n${selectedTrivia.question}\nType your answer:`;
    //         return response;
    //     }

    //     // Word Scramble
    //     else if (userMessage.includes("word scramble")) {
    //         const words = ["javascript", "programming", "developer", "algorithm"];
    //         const word = words[Math.floor(Math.random() * words.length)];
    //         const scrambled = word.split("").sort(() => Math.random() - 0.5).join("");
    //         response = `🔤 Word Scramble!\nUnscramble this word: ${scrambled}`;
    //         return response;
    //     }

    //     // Math Quiz
    //     else if (userMessage.includes("math quiz")) {
    //         const num1 = Math.floor(Math.random() * 50) + 1;
    //         const num2 = Math.floor(Math.random() * 50) + 1;
    //         response = `➕ Math Quiz!\nWhat is ${num1} + ${num2}? Type your answer:`;
    //         return response;
    //     }

    //     // Memory Test
    //     else if (userMessage.includes("memory test")) {
    //         const numbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)).join(" ");
    //         response = `🧠 Memory Test!\nMemorize these numbers: ${numbers}\nType them back after 10 seconds!`;
    //         return response;
    //     }

    //     // Fallback if no game is chosen
    //     else {
    //         response = `🎮 Choose a game from the following options:\n- ${gameOptions.join("\n- ")}\nType the name of the game to start!`;
    //         return response;
    //     }
    // }

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

    // ===================== News =====================

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
        cleanCommand = cleanCommand.replace(/\s*x\s*/, "*"); // Handle spaces around 'x'

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
    else if (
        (userMessage.includes("add") && userMessage.includes("reminder")) ||
        (userMessage.includes("set") && userMessage.includes("set reminder")) ||
        (userMessage.includes("create") && userMessage.includes("reminder"))
    ) {
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
            // Extract the number from the userMessage
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
