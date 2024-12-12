import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateBotResponse = (message) => {
    const userMessage = message.toLowerCase();

    // ============== Small Talk =================
    if (
        userMessage.includes("hello") ||
        userMessage.includes("hey") ||
        userMessage.includes("hi there") ||
        userMessage == "hi"
    ) {
        return "Hello! How can I help you?";
    } else if (userMessage.includes("how are you")) {
        const responses = [
            "I'm doing great, thanks for asking! How about you?",
            "I'm just a bunch of code, but I’m feeling awesome! How are you?",
            "I'm functioning at full capacity, ready to assist you! How are you?",
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    } else if (
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
    // ========================== Small Game Feature ==========================
    else if (userMessage.includes("play a game")) {
    const userGameMessage = userMessage.toLowerCase();
    const gameOptions = ["number guessing", "rock paper scissors", "tic tac toe", "trivia challenge", "word scramble", "math quiz", "memory test"];

    // Number Guessing Game
    if (userGameMessage.includes("number guessing")) {
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        return `🎲 Let's play a Number Guessing Game!\nI've picked a number between 1 and 100. Try to guess it by typing a number.`;
    } 

    // Rock Paper Scissors
    else if (userGameMessage.includes("rock paper scissors")) {
        const choices = ["rock", "paper", "scissors"];
        const botChoice = choices[Math.floor(Math.random() * choices.length)];
        return `✊✋✌️ Let's play Rock-Paper-Scissors!\nType your choice (rock, paper, or scissors), and I'll reveal mine.`;
    } 

    // Tic Tac Toe
    else if (userGameMessage.includes("tic tac toe")) {
        return `🎮 Let's play Tic Tac Toe!\nUnfortunately, I can't display the board here, but type your moves like 'A1', 'B2', etc., and I'll play along!`;
    } 

    // Trivia Challenge
    else if (userGameMessage.includes("trivia challenge")) {
        const triviaQuestions = [
            { question: "What is the capital of France?", answer: "paris" },
            { question: "Who wrote 'Romeo and Juliet'?", answer: "shakespeare" },
            { question: "What is 8 x 12?", answer: "96" },
            { question: "Who painted the Mona Lisa?", answer: "da vinci" },
            { question: "What is the largest planet in our solar system?", answer: "jupiter" },
            { question: "What is the smallest country in the world?", answer: "vatican city" },
            { question: "Which animal is known as the King of the Jungle?", answer: "lion" },
            { question: "What is the largest ocean on Earth?", answer: "pacific" },
            { question: "Who discovered gravity?", answer: "newton" },
            { question: "What is the chemical symbol for gold?", answer: "au" },
            { question: "In which year did the Titanic sink?", answer: "1912" },
            { question: "What is the hardest natural substance on Earth?", answer: "diamond" },
            { question: "Who was the first president of the United States?", answer: "george washington" },
            { question: "What is the largest desert in the world?", answer: "sahara" },
            { question: "What is the longest river in the world?", answer: "amazon" }
        ];
        const selectedTrivia = triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)];
        return `🧠 Trivia Time!\n${selectedTrivia.question}\nType your answer:`;
    } 

    // Word Scramble
    else if (userGameMessage.includes("word scramble")) {
        const words = ["javascript", "programming", "developer", "algorithm"];
        const word = words[Math.floor(Math.random() * words.length)];
        const scrambled = word.split("").sort(() => Math.random() - 0.5).join("");
        return `🔤 Word Scramble!\nUnscramble this word: ${scrambled}`;
    } 

    // Math Quiz
    else if (userGameMessage.includes("math quiz")) {
        const num1 = Math.floor(Math.random() * 50) + 1;
        const num2 = Math.floor(Math.random() * 50) + 1;
        return `➕ Math Quiz!\nWhat is ${num1} + ${num2}? Type your answer:`;
    } 

    // Memory Test
    else if (userGameMessage.includes("memory test")) {
        const numbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)).join(" ");
        return `🧠 Memory Test!\nMemorize these numbers: ${numbers}\nType them back after 10 seconds!`;
    } 

    // Default Game Options
    else {
        return `🎮 Let's have some fun! Choose a game to play:\n- ${gameOptions.join("\n- ")}\nType the name of the game to start!`;
    }
}

    // ============== Weather Functioning (Arun) ====================
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
        }

        // Responces
        let responses = [];

        // If input format is correct
        if (location) {
            // Trying to fetch API
            fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
            )
                .then((responce) => responce.json())
                .then((data) => {
                    // If responce is valid
                    if (data.cod === 200) {
                        const temp = data.main.temp;
                        const weatherCondition = data.weather[0].description;

                        responses.push(
                            `Weather in ${data.name} is ${weatherCondition} and the temperature is ${temp}°C`
                        );
                        // responses.push(`${data.name}'s Weather is ${weatherCondition} with a temperature of ${temp}°C`);
                        // responses.push(`Temperature of ${data.name} is ${temp}°C and the condition of Weather is ${weatherCondition}`);
                    }

                    // If responce is invalid
                    else {
                        responses.push(
                            `Sorry, I'm unable to find weather update for ${location}`
                        );
                    }

                    // If failed to fetch API
                })
                .catch((error) => {
                    responses.push(
                        `Something went wrong. Please try again later.`
                    );
                });

            // For unknown weather input
        } else {
            responses.push(`Please provide a location.`);
        }

        // Returning responces
        console.log(responses);

        return responses;
    }

    // ==================== Joke part =======================
    else if (userMessage.includes("joke")) {
        let responses = [];
        // Trying to fetch API
        fetch(`https://icanhazdadjoke.com/slack`)
            .then((responce) => responce.json())
            .then((data) => {
                // If responce is valid
                responses.push(`${data.attachments[0].text}`);
            })
            .catch((error) => {
                responses.push(`Something went wrong. Please try again later.`);
            });

        console.log(responses);
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
                `Your Promt is: ${prompt} || Remember this thing: 1. We are using your API, so for our service try to generate output under 30 words if possible and you can increase if nessesary. 2. If someone wants to know about your name, owner, Creator or related then, Your name: Nexus Ai, Owner/Creator: Group A(BCA final year students from Kingston School of Management & Science)', 3. You are a chat bot not an API, also do text formating, dont add * and other symbols without meaning. 4. Dont include your persoanl information I provided to you if user didn't ask about it`
            );
            resultText = result.response.text();
            console.log(resultText);
            responses.push(`${resultText}`);
        }

        tasks();
        return responses;
    }
};
