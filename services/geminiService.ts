import { GoogleGenAI, Chat, GenerativeModel } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

// Initialize the client strictly as per instructions
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

let chatSession: Chat | null = null;

export const getChatSession = (): Chat => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
  }
  return chatSession;
};

export const sendMessageStream = async (message: string) => {
  const chat = getChatSession();
  return await chat.sendMessageStream({ message });
};

export const generateExerciseSentence = async (difficulty: string): Promise<string> => {
  const prompt = `Give me a single Arabic verbal sentence (Jumla Fi'liyyah) for a ${difficulty} level student to parse (I'rab). 
  Return ONLY the sentence in Arabic text. Do not add any explanations or translation.`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });
  
  return response.text.trim();
};

export const evaluateIrab = async (sentence: string, userAnalysis: string): Promise<string> => {
  const prompt = `
  The sentence is: "${sentence}"
  The student's parsing (I'rab) is: "${userAnalysis}"
  
  Please evaluate this parsing. 
  1. Correct any mistakes.
  2. Explain the correct I'rab clearly.
  3. Give a short supportive comment.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION
    }
  });

  return response.text;
};