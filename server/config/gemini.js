import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

// This module is evaluated before server.js runs its startup code.
// Load the environment here so the API key is available during initialization.
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
const MODEL_NAME = process.env.GEMINI_MODEL || "gemini-2.5-flash";

// ✅ Use a stable model with higher free-tier limits
export const geminiModel = genAI
  ? genAI.getGenerativeModel({
      model: MODEL_NAME,
      systemInstruction: `You are PlantConnect AI - an expert Indian horticulturist.
Give practical, region-specific advice for Indian climate.
Always structure: 🌱 Best Plants | 💧 Care | 🧪 Fertilizer | 🌍 Pollution Benefit.
Keep answers under 250 words, use emojis, be friendly.`,
    })
  : null;

/* =========================================================
   🧠 FALLBACK KNOWLEDGE BASE
   Used when Gemini API is unavailable / down / rate-limited
   ========================================================= */
const FALLBACK_KB = [
  {
    keywords: ["money plant", "pothos", "epipremnum"],
    answer: `🌱 Best Plants: Money Plant (Epipremnum aureum) — perfect for Indian homes.
💧 Care: Water when top 2 inches of soil dry. Indirect sunlight. Trim yellow leaves.
🧪 Fertilizer: Balanced liquid fertilizer (NPK 19:19:19) monthly, diluted ½ strength.
🌍 Pollution Benefit: Removes formaldehyde, benzene & xylene; improves indoor air quality.`,
  },
  {
    keywords: ["snake plant", "sansevieria", "mother in law"],
    answer: `🌱 Best Plants: Snake Plant (Sansevieria trifasciata) — survives neglect.
💧 Care: Water every 2–3 weeks; let soil dry completely. Tolerates low light.
🧪 Fertilizer: Cactus/succulent fertilizer once in spring & monsoon.
🌍 Pollution Benefit: Releases oxygen at night, filters formaldehyde & toluene.`,
  },
  {
    keywords: ["tulsi", "holy basil", "basil"],
    answer: `🌱 Best Plants: Tulsi (Ocimum sanctum) — sacred & medicinal.
💧 Care: Full sun 4–6 hrs. Water daily in summer, alternate days in winter.
🧪 Fertilizer: Vermicompost or cow dung manure every 30 days.
🌍 Pollution Benefit: Absorbs SO₂, NO₂ & dust; purifies air & boosts immunity.`,
  },
  {
    keywords: ["aloe", "aloe vera"],
    answer: `🌱 Best Plants: Aloe Vera — drought-tolerant & medicinal.
💧 Care: Water every 10–14 days. Sandy, well-draining soil. Bright indirect light.
🧪 Fertilizer: Diluted succulent fertilizer twice a year (spring & monsoon).
🌍 Pollution Benefit: Removes formaldehyde & benzene; releases oxygen at night.`,
  },
  {
    keywords: ["air purifying", "pollution", "indoor air", "clean air"],
    answer: `🌱 Best Plants: Areca Palm, Snake Plant, Peace Lily, Rubber Plant, Spider Plant.
💧 Care: Water moderately; wipe leaves weekly to remove dust.
🧪 Fertilizer: Balanced NPK monthly during growing season.
🌍 Pollution Benefit: These NASA-recommended plants filter formaldehyde, benzene, CO₂ & VOCs.`,
  },
  {
    keywords: ["terrace", "balcony", "rooftop", "garden"],
    answer: `🌱 Best Plants: Bougainvillea, Hibiscus, Curry Leaf, Mint, Tomatoes, Chillies.
💧 Care: Water early morning; use mulch to retain moisture in Indian summers.
🧪 Fertilizer: Organic compost monthly; seaweed spray fortnightly.
🌍 Pollution Benefit: Green cover on terraces reduces indoor temp by 3–5°C & cuts dust.`,
  },
  {
    keywords: ["monsoon", "rainy", "rain"],
    answer: `🌱 Best Plants: Monsoon-friendly — Ferns, Colocasia, Banana, Curry Leaf.
💧 Care: Ensure drainage; avoid overwatering. Check for fungus.
🧪 Fertilizer: Reduce nitrogen; add potash for root strength.
🌍 Pollution Benefit: Lush foliage traps PM2.5 & cools surroundings.`,
  },
  {
    keywords: ["summer", "hot", "heat"],
    answer: `🌱 Best Plants: Bougainvillea, Portulaca, Adenium, Neem, Aloe Vera.
💧 Care: Water early morning & evening; use mulch. Shade afternoon sun.
🧪 Fertilizer: Low-nitrogen fertilizer; avoid midday feeding.
🌍 Pollution Benefit: These plants tolerate heat & still filter dust efficiently.`,
  },
  {
    keywords: ["winter", "cold"],
    answer: `🌱 Best Plants: Marigold, Chrysanthemum, Spinach, Coriander, Petunia.
💧 Care: Water less; ensure morning sunlight. Protect from frost in North India.
🧪 Fertilizer: Phosphorus-rich fertilizer for blooms.
🌍 Pollution Benefit: Winter bloomers add greenery when air quality is worst.`,
  },
  {
    keywords: ["fertilizer", "manure", "npk", "nutrient"],
    answer: `🌱 Best Plants: All flowering & leafy plants benefit.
💧 Care: Fertilize early morning; water before & after.
🧪 Fertilizer: NPK 19:19:19 for growth; 0:52:34 for flowering; vermicompost monthly.
🌍 Pollution Benefit: Healthy plants filter more pollutants & release more oxygen.`,
  },
  {
    keywords: ["water", "watering", "irrigation"],
    answer: `🌱 Best Plants: All — watering technique matters.
💧 Care: Water early morning; check topsoil before watering. Avoid wetting leaves.
🧪 Fertilizer: Water-soluble fertilizer every 2 weeks.
🌍 Pollution Benefit: Well-hydrated plants transpire more, cooling the air naturally.`,
  },
  {
    keywords: ["pest", "insect", "bugs", "aphid", "mealybug"],
    answer: `🌱 Best Plants: Neem-treated plants recover best.
💧 Care: Spray neem oil (5ml/L) weekly; remove infected leaves.
🧪 Fertilizer: Avoid excess nitrogen (attracts pests).
🌍 Pollution Benefit: Healthy pest-free plants purify air effectively.`,
  },
];

const GREETING_PATTERNS = [
  { keywords: ["hi", "hello", "hey", "namaste"], answer: "🙏 Namaste! I'm PlantConnect AI. Ask me about any plant, care tips, fertilizer, or pollution benefits. 🌿" },
  { keywords: ["thanks", "thank you", "dhanyavad"], answer: "🌱 Happy gardening! Ping me anytime for more plant advice. 🌸" },
  { keywords: ["bye", "goodbye"], answer: "👋 Take care! May your garden always bloom. 🌻" },
];

const DEFAULT_FALLBACK = `🌱 Best Plants: I'm currently offline from the main AI, but here's a quick tip — Areca Palm, Snake Plant & Tulsi are perfect for Indian homes.
💧 Care: Water early morning, check soil moisture before watering.
🧪 Fertilizer: Vermicompost monthly + NPK 19:19:19 during growth.
🌍 Pollution Benefit: These filter formaldehyde, benzene & dust.
👉 Try asking about a specific plant (e.g., "money plant", "aloe vera", "terrace garden").`;

/* =========================================================
   Fallback matcher — keyword-based lookup
   ========================================================= */
function getFallbackAnswer(prompt = "") {
  const text = prompt.toLowerCase();

  // Check greetings first
  for (const g of GREETING_PATTERNS) {
    if (g.keywords.some((k) => text.includes(k))) return g.answer;
  }

  // Score matches by keyword hits
  let best = null;
  let bestScore = 0;
  for (const entry of FALLBACK_KB) {
    const score = entry.keywords.reduce(
      (acc, k) => (text.includes(k) ? acc + 1 : acc),
      0
    );
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  return best ? best.answer : DEFAULT_FALLBACK;
}

/* =========================================================
   Main wrapper with retry + fallback
   ========================================================= */
export const generateWithRetry = async (prompt, maxRetries = 4) => {
  // If API key missing, skip straight to fallback
  if (!genAI || !geminiModel) {
    console.warn("⚠️ Gemini not configured — using fallback response.");
    return getFallbackAnswer(prompt);
  }

  let lastError;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const result = await geminiModel.generateContent(prompt);
      return result.response.text();
    } catch (err) {
      lastError = err;
      const status = err?.status || err?.response?.status;

      // Non-retryable errors → fallback immediately
      if (status !== 503 && status !== 429) {
        console.warn(`⚠️ Gemini error (${status || "unknown"}) — using fallback.`);
        return getFallbackAnswer(prompt);
      }

      const delay = Math.min(1000 * Math.pow(2, attempt), 30000);
      console.log(
        `⏳ Gemini busy (${status}). Retry ${attempt + 1}/${maxRetries} in ${delay}ms...`
      );
      await new Promise((r) => setTimeout(r, delay));
    }
  }

  // All retries exhausted → fallback
  console.warn("❌ Gemini unavailable after retries — using fallback response.");
  return getFallbackAnswer(prompt);
};

export default genAI;