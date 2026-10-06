import { motion } from "framer-motion";

const Leaf = ({ delay, x, duration, size, emoji, drift }) => (
  <motion.div
    initial={{ y: -80, x, opacity: 0, rotate: 0 }}
    animate={{
      y: "110vh",
      x: [`${x}`, `calc(${x} + ${drift}px)`, `${x}`],
      opacity: [0, 1, 1, 0],
      rotate: 360,
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "linear",
      x: { duration: duration / 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
    }}
    className="fixed top-0 pointer-events-none z-0 select-none"
    style={{ fontSize: size, left: 0 }}
  >
    {emoji}
  </motion.div>
);

export default function LeafAnimation() {
  // x values are percentages across the full viewport width
  // Left cluster (10–25%), middle (40–60%), right cluster (75–90%)
  const leaves = [
    // 🌿 LEFT SIDE
    { delay: 0,   x: "2%",  duration: 12, size: 26, emoji: "🍃", drift:  30 },
    { delay: 3,   x: "8%",  duration: 15, size: 20, emoji: "🌿", drift: -25 },
    { delay: 6,   x: "15%", duration: 13, size: 28, emoji: "🍃", drift:  35 },
    { delay: 1.5, x: "22%", duration: 16, size: 22, emoji: "🌱", drift: -20 },

    // 🌿 MIDDLE
    { delay: 2,   x: "42%", duration: 17, size: 20, emoji: "🍃", drift:  25 },
    { delay: 5,   x: "55%", duration: 14, size: 24, emoji: "🌿", drift: -30 },

    // 🌿 RIGHT SIDE
    { delay: 0.5, x: "75%", duration: 15, size: 22, emoji: "🍃", drift:  25 },
    { delay: 4,   x: "82%", duration: 12, size: 26, emoji: "🌿", drift: -30 },
    { delay: 2.5, x: "88%", duration: 14, size: 20, emoji: "🍃", drift:  35 },
    { delay: 7,   x: "94%", duration: 16, size: 28, emoji: "🌱", drift: -25 },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {leaves.map((l, i) => (
        <Leaf key={i} {...l} />
      ))}
    </div>
  );
}