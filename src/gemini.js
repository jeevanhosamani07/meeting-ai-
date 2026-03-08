import axios from "axios";

const API_KEY = "AIzaSyDc0WwLh2ZR9olCYxFGo15jm2Yk9wXi59Y";

export const getAISummary = async (text) => {

try {

const prompt = `
You are an AI meeting assistant.

Analyze this meeting transcript and provide:

1. Meeting Summary
2. Key Decisions
3. Action Items
4.meeting Deadlines

Transcript:
${text}
`;

const response = await axios.post(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
{
contents: [
{
parts: [{ text: prompt }]
}
]
}
);

return response.data.candidates[0].content.parts[0].text;

} catch (error) {

console.error("Gemini error:", error);

return "Failed to generate AI summary.";

}

};