// Hugging Face API Call(Text to Image)
const generateImage = async (prompt) => {
    const token = import.meta.env.VITE__HuggingFace_Token; // Make sure to set your token here
    const response = await fetch(
        "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ inputs: prompt }),
        }
    );

    if (response.ok) {
        const result = await response.blob();
        const imageUrl = URL.createObjectURL(result);
        return imageUrl;
    } else {
        console.error("Error generating image:", response.status);
        return null;
    }
};

export default generateImage;