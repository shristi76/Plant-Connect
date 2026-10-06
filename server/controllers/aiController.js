import { generateWithRetry } from "../config/gemini.js";
import AIChat from "../models/AIChat.js";

export const chatWithAI = async (req, res) => {
  try {
    const { question, city = "India" } = req.body;
    if (!question) return res.status(400).json({ message: "question required" });

    const prompt = `User location: ${city}, India.
User question: ${question}

Respond using this format:
🌱 Best Plants for this area:
💧 Care Tips:
🧪 Fertilizer Advice:
🌍 Pollution / Air Benefit:`;

    // ✅ Use retry wrapper instead of geminiModel.generateContent
    const answer = await generateWithRetry(prompt);

    await AIChat.create({
      user: req.user?._id,
      question,
      answer,
      category: "general",
    });

    res.json({ answer });
  } catch (e) {
    console.error("Gemini chat error:", e);
    const status = e?.status || 500;
    res.status(status).json({
      message:
        status === 503
          ? "AI is overloaded right now. Please try again in a moment."
          : status === 429
          ? "Too many requests. Please wait a few seconds."
          : "AI error: " + e.message,
    });
  }
};

export const recommendPlants = async (req, res) => {
  try {
    const { city } = req.body;
    const prompt = `Give top 6 air-purifying plants for ${city}, India. For each: name, why it suits, quick care tip. Format as JSON array with fields: name, reason, care, pollutionScore (1-10). ONLY JSON.`;

    // ✅ Use retry wrapper
    const text = (await generateWithRetry(prompt))
      .replace(/```json|```/g, "")
      .trim();

    let plants;
    try {
      plants = JSON.parse(text);
    } catch {
      plants = [
        {
          name: "Snake Plant",
          reason: text.slice(0, 200),
          care: "Low water",
          pollutionScore: 9,
        },
      ];
    }
    res.json({ city, plants });
  } catch (e) {
    console.error("Gemini recommend error:", e);
    const status = e?.status || 500;
    res.status(status).json({
      message:
        status === 503
          ? "AI is overloaded. Try again in a moment."
          : "AI error: " + e.message,
    });
  }
};