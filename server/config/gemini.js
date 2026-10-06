import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Use a stable model with higher free-tier limits
export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction: `You are PlantConnect AI - an expert Indian horticulturist.
Give practical, region-specific advice for Indian climate.
Always structure: 🌱 Best Plants | 💧 Care | 🧪 Fertilizer | 🌍 Pollution Benefit.
Keep answers under 250 words, use emojis, be friendly.`,
});

// ✅ Retry wrapper for 503 / 429 errors with exponential backoff
export const generateWithRetry = async (prompt, maxRetries = 4) => {
  let lastError;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const result = await geminiModel.generateContent(prompt);
      return result.response.text();
    } catch (err) {
      lastError = err;
      const status = err?.status || err?.response?.status;

      // Only retry on 503 (overloaded) or 429 (rate limited)
      if (status !== 503 && status !== 429) throw err;

      // Exponential backoff: 1s, 2s, 4s, 8s, 16s (capped at 30s)
      const delay = Math.min(1000 * Math.pow(2, attempt), 30000);
      console.log(
        `⏳ Gemini busy (${status}). Retry ${attempt + 1}/${maxRetries} in ${delay}ms...`
      );
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw lastError;
};

export default genAI;