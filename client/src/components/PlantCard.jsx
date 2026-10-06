import { motion } from "framer-motion";

export default function PlantCard({ emoji = "🌱", title, subtitle, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8 }}
      className="glass rounded-3xl p-6 card-hover"
    >
      <div className="text-5xl mb-3 animate-sway inline-block">{emoji}</div>
      <h3 className="text-xl font-bold text-leaf-800">{title}</h3>
      {subtitle && <p className="text-leaf-600 text-sm mb-2">{subtitle}</p>}
      {children}
    </motion.div>
  );
}