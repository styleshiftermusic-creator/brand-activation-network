import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_AI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

/**
 * GemmaService
 * Provides a centralized interface for interacting with Gemma 4 models.
 * Supports Hybrid Execution:
 * 1. Cloud: via Google AI SDK (Primary)
 * 2. Local: via Ollama API (Fallback if API key is missing)
 */
export const GemmaService = {
  /**
   * Generates a completion using Gemma 4.
   */
  async generateCompletion(
    systemPrompt: string,
    userPrompt: string,
    modelName: string = "gemma-4"
  ) {
    // Attempt Cloud First
    if (genAI) {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: systemPrompt,
      });

      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      });

      return result.response.text();
    }

    // Fallback to Local Ollama
    console.log("Cloud API key missing. Falling back to local Ollama...");
    try {
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        body: JSON.stringify({
          model: "gemma4",
          prompt: userPrompt,
          system: systemPrompt,
          stream: false,
        }),
      });

      const data = await response.json();
      return data.response;
    } catch (error) {
      throw new Error("Gemma 4 is not available. Please provide a GOOGLE_AI_API_KEY or start 'ollama serve' locally.");
    }
  },

  /**
   * Generates a streaming response.
   */
  async generateStream(
    systemPrompt: string,
    userPrompt: string,
    modelName: string = "gemma-4"
  ) {
    if (genAI) {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: systemPrompt,
      });

      const result = await model.generateContentStream({
        contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      });

      return result.stream;
    }

    // Local Ollama Streaming
    try {
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        body: JSON.stringify({
          model: "gemma4",
          prompt: userPrompt,
          system: systemPrompt,
          stream: true,
        }),
      });

      return response.body; // Return raw stream for the API route to handle
    } catch (error) {
      throw new Error("Local Ollama stream failed. Is the service running?");
    }
  }
};
