import axios from "axios"

const API_KEY = "AIzaSyAsvPDYzOn8Ap7NFTPtedeiVvButWg0XHo"

export const getAIResponse = async (text) => {
  const prompt = `
You are an AI meeting assistant.

Summarize this and give action items:

${text}
`

  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
    {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    }
  )

  return response.data.candidates[0].content.parts[0].text
}