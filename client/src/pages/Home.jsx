import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Heart, Sparkles, ArrowRight } from "lucide-react";

// ================= IMAGE SOURCES =================
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1920&q=80",
  nursery:
    "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80",
  donation:
    "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1200&q=80",
  ai: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?auto=format&fit=crop&w=1200&q=80",
  cta: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1920&q=80",
};

// ================= DATA =================
const features = [
  {
    icon: MapPin,
    title: "Find Nearby Nurseries",
    desc: "Discover trusted plant shops within walking distance of your home.",
    to: "/nurseries",
    image: IMAGES.nursery,
    accent: "from-emerald-500 to-green-700",
  },
  {
    icon: Heart,
    title: "Neighbour Donations",
    desc: "Share cuttings, saplings & seeds with your local community for free.",
    to: "/donations",
    image: IMAGES.donation,
    accent: "from-pink-500 to-rose-700",
  },
  {
    icon: Sparkles,
    title: "AI Plant Doctor",
    desc: "Get city-specific plant picks, fertilizer & care tips from Gemini AI.",
    to: "/ai",
    image: IMAGES.ai,
    accent: "from-amber-500 to-orange-700",
  },
];

const steps = [
  {
    n: "01",
    title: "Pick your plant",
    desc: "Browse nurseries or grab free cuttings from a neighbour nearby.",
    icon: "🌱",
  },
  {
    n: "02",
    title: "Care with AI",
    desc: "Ask our AI Doctor for watering, sunlight & fertilizer schedules.",
    icon: "🤖",
  },
  {
    n: "03",
    title: "Grow & share",
    desc: "Once grown, donate cuttings to keep the green chain going.",
    icon: "🌿",
  },
];

const stats = [
  { value: "21%", label: "India's forest cover — below the 33% target" },
  { value: "1.6M", label: "Deaths per year from air pollution" },
  { value: "1 🌿", label: "Single plant = oxygen for one person/day" },
];

// ================= COMPONENT =================
export default function Home() {
  return (
    <div className="overflow-x-hidden">

      {/* ===================== HERO ===================== */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">

        {/* Blurred + Zooming background image */}
        <motion.img
          src={IMAGES.hero}
          alt="Plants background"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 w-full h-full object-cover object-center
            blur-[3px] scale-110"
        />

        {/* Text content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pb-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white drop-shadow-2xl leading-tight"
          >
            Grow a{" "}
            <span className="bg-gradient-to-r from-leaf-300 via-emerald-200 to-lime-300 bg-clip-text text-transparent">
              Greener
            </span>
            <br />
            India 🌏
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-lg md:text-2xl text-leaf-100 max-w-2xl mx-auto"
          >
            Less forests, more pollution — but you can make a difference from
            your balcony. Find plants, share cuttings, and get AI-powered care
            advice.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-4 justify-center"
          >
            <Link
              to="/nurseries"
              className="group btn-primary flex items-center gap-2 !px-8 !py-4 text-lg"
            >
              Find Nurseries
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/ai"
              className="px-8 py-4 rounded-full border-2 border-white text-white font-semibold text-lg hover:bg-white hover:text-leaf-800 transition"
            >
              Ask AI 
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===================== ALTERNATING FEATURE SECTIONS ===================== */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-leaf-800">
            Everything you need to go green 
          </h2>
          <p className="mt-4 text-leaf-600 text-lg max-w-2xl mx-auto">
            Three powerful tools — one mission: turn every Indian home into a
            mini forest.
          </p>
        </motion.div>

        <div className="space-y-24">
          {features.map((f, i) => {
            const reverse = i % 2 === 1;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid md:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  reverse ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Image with hover zoom + lift */}
                <div className="group relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-leaf-500/40 hover:shadow-2xl">
                  <img
                    src={f.image}
                    alt={f.title}
                    className="w-full h-[400px] object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                  />

                  {/* Colored tint on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${f.accent} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                  />

                  {/* Dark gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Icon badge with rotate */}
                  <div
                    className={`absolute top-6 left-6 w-14 h-14 rounded-2xl bg-gradient-to-br ${f.accent} flex items-center justify-center shadow-lg transition-all duration-500 group-hover:rotate-12 group-hover:scale-110`}
                  >
                    <f.icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Text */}
                <div>
                  <span
                    className={`inline-block text-sm font-bold bg-gradient-to-r ${f.accent} bg-clip-text text-transparent mb-3`}
                  >
                    FEATURE {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-leaf-900">
                    {f.title}
                  </h3>
                  <p className="mt-4 text-lg text-leaf-700">{f.desc}</p>
                  <ul className="mt-6 space-y-2 text-leaf-700">
                    <li className="flex items-center gap-2">
                      ✅ Free & instant
                    </li>
                    <li className="flex items-center gap-2">
                      ✅ Works on mobile
                    </li>
                    <li className="flex items-center gap-2">
                      ✅ Built for India
                    </li>
                  </ul>
                  <Link
                    to={f.to}
                    className="btn-primary inline-flex items-center gap-2 mt-8"
                  >
                    Try it now <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section className="bg-leaf-50 py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-leaf-800 text-center"
          >
            How it works
          </motion.h2>
          <p className="text-center text-leaf-600 mt-4 text-lg">
            Three simple steps to a greener home
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-16">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:shadow-leaf-500/20 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-6xl mb-4 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6 inline-block">
                  {s.icon}
                </div>
                <div className="absolute top-6 right-6 text-5xl font-extrabold text-leaf-100 select-none transition-colors duration-300 group-hover:text-leaf-200">
                  {s.n}
                </div>
                <h3 className="text-xl font-bold text-leaf-900 mt-2">
                  {s.title}
                </h3>
                <p className="mt-2 text-leaf-600">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== STATS ===================== */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative rounded-3xl overflow-hidden p-10 text-white text-center shadow-2xl transition-all duration-500 hover:shadow-leaf-500/40"
            >
              {/* Zooming background */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                style={{ backgroundImage: `url(${IMAGES.cta})` }}
              />
              {/* Green overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-leaf-700/85 to-leaf-900/95 transition-opacity duration-500 group-hover:from-leaf-600/85 group-hover:to-leaf-800/95" />
              {/* Shine sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent" />

              {/* Content */}
              <div className="relative z-10">
                <div className="text-5xl md:text-6xl font-extrabold drop-shadow transition-transform duration-500 group-hover:scale-110">
                  {s.value}
                </div>
                <p className="mt-3 text-leaf-100">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="group relative py-32 bg-cover bg-center overflow-hidden">
        {/* Zooming background */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out group-hover:scale-110"
          style={{ backgroundImage: `url(${IMAGES.cta})` }}
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-extrabold text-white leading-tight"
          >
            Ready to plant your first ?
          </motion.h2>
          <p className="mt-6 text-xl text-leaf-100">
            Join thousands of Indians growing greener homes — one pot at a time.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link
              to="/register"
              className="btn-primary !px-8 !py-4 text-lg hover:scale-105 transition-transform"
            >
              Get Started Free
            </Link>
            <Link
              to="/nurseries"
              className="px-8 py-4 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-leaf-800 hover:scale-105 transition-all"
            >
              Browse Nurseries
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}