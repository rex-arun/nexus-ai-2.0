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
        if(userMessage.includes("in")){
            location = userMessage.split(" in ")[1]?.trim()
        }
        else if(userMessage.includes("of")){
            location = userMessage.split(" of ")[1]?.trim();
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
        return responses;
    }


    else {
        return "I didn't understand that.";
    }
};

