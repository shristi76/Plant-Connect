import { motion } from "framer-motion";
import {
  Sprout,
  Droplets,
  FlaskConical,
  Bug,
  Sun,
  Leaf,
} from "lucide-react";

const suggestions = [
  { icon: Sprout, label: "Best plants for my city", prompt: "Which are the best air-purifying plants I can grow in my city? Give top 5 with care tips.", color: "from-emerald-500 to-green-700" },
  { icon: Droplets, label: "Watering schedule", prompt: "How often should I water my indoor plants in Indian climate? Give a simple weekly schedule.", color: "from-sky-500 to-blue-700" },
  { icon: FlaskConical, label: "Organic fertilizer", prompt: "Suggest natural/organic fertilizers I can make at home for flowering plants.", color: "from-amber-500 to-orange-700" },
  { icon: Bug, label: "Pest control", prompt: "How to get rid of common pests like aphids and mealybugs on indoor plants naturally?", color: "from-rose-500 to-red-700" },
  { icon: Sun, label: "Sunlight needs", prompt: "How much sunlight do common Indian balcony plants need? Categorize by full/partial/shade.", color: "from-yellow-500 to-amber-700" },
  { icon: Leaf, label: "Money plant care", prompt: "Complete care guide for a money plant in Indian weather.", color: "from-lime-500 to-green-700" },
];

export default function WelcomeScreen({ onSend }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
      {/* <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-leaf-500 to-emerald-700 flex items-center justify-center shadow-lg mb-5"
      >
        <Leaf className="w-8 h-8 text-white" />
      </motion.div> */}

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-2xl md:text-3xl font-bold text-leaf-900 text-center"
      >
        How can I help you grow today?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-leaf-600 text-center mt-2 max-w-md"
      >
        Ask me anything about plants, care, fertilizers, or pollution-fighting
        greenery — personalized for your city.
      </motion.p>

      <div className="grid sm:grid-cols-2 gap-3 mt-8 w-full max-w-2xl">
        {suggestions.map((s, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            whileHover={{ y: -2 }}
            onClick={() => onSend(s.prompt)}
            className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-leaf-200 hover:border-leaf-400 hover:shadow-md text-left transition group"
          >
            <div
              className={`shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}
            >
              <s.icon className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-leaf-800 leading-snug">
              {s.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}