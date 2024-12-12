import {GoogleGenerativeAI} from "@google/generative-ai";


export const generateBotResponse = (message) => {
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
        if(userMessage.includes("of")){
            location = userMessage.split(" of ")[1]?.trim()
        }
        else if(userMessage.includes("in")){
            location = userMessage.split(" in ")[1]?.trim();
        }

        // Responces 
        let responses = [];

        // If input format is correct
        if(location){

            // Trying to fetch API
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`)
            .then((responce) => responce.json()).then((data) => {
                
                // If responce is valid
                if(data.cod === 200){
                    const temp = data.main.temp;
                    const weatherCondition = data.weather[0].description;

                    responses.push(`Weather in ${data.name} is ${weatherCondition} and the temperature is ${temp}°C`);
                    // responses.push(`${data.name}'s Weather is ${weatherCondition} with a temperature of ${temp}°C`);
                    // responses.push(`Temperature of ${data.name} is ${temp}°C and the condition of Weather is ${weatherCondition}`);
                }

                // If responce is invalid
                else{
                    responses.push(`Sorry, I'm unable to find weather update for ${location}`);
                }

            // If failed to fetch API
            }).catch((error) => {
                responses.push(`Something went wrong. Please try again later.`);
            });
        
        // For unknown weather input 
        }
        else{
            responses.push(`Please provide a location.`);
        }

        // Returning responces
        console.log(responses);
        
        return responses;
    }

    // ==================== Joke part =======================
    
    else if (
        userMessage.includes("joke")
    ) {
        
        let responses = [];
        // Trying to fetch API
        fetch(`https://icanhazdadjoke.com/slack`)
        .then((responce) => responce.json()).then((data) => {
            
            // If responce is valid
                responses.push(`${data.attachments[0].text}`);
            }).catch((error) => {
            responses.push(`Something went wrong. Please try again later.`);
        });

        console.log(responses);
        return responses;
        
        }


    // =================== Else part =======================
    else
    {
        // ======= Gemini Model =============

        let responses = [];
        let resultText;


    async function tasks() {

        console.log(userMessage);
        const genAI = new GoogleGenerativeAI("AIzaSyBFbh1m-8HNU0nW3s-wH2g34QEzwxXYgdI");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
        const prompt = userMessage;
        const result = await model.generateContent(`Your Promt is: ${prompt} || Remember this thing: 1. We are using your API, so for our service try to generate output under 20 words if possible and you can increase if nessesary. 2. If someone wants to know about your name, owner, Creator or related then, Your name: Nexus Ai, Owner/Creator: Group A(BCA final year students from Kingston School of Management & Science)', 3. You are a chat bot not an API, also do text formating, dont add * and other symbols without meaning. 4. Dont include your persoanl information I provided to you if user didn't ask about it`);
        resultText = result.response.text();
        console.log(resultText);
        responses.push(`${resultText}`)
        
    }

    tasks();
    return responses;

  }

}
