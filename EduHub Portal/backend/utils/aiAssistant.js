// utils/aiHelper.js
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export const generateAIResponse = async (message) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: message,
    instructions: `
      Respond politely, clearly, and concisely.
      Focus on helping users understand topics easily.
    `,
  });

  return response.text;
};
