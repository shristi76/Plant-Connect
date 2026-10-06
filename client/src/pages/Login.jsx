import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { Leaf, Sparkles } from "lucide-react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeName, setWelcomeName] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", form);
      login(data);

      // Show welcome overlay
      setWelcomeName(data.user?.name || "friend");
      setShowWelcome(true);
      setTimeout(() => navigate("/"), 2400);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally { setLoading(false); }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-4 py-10 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1466781783364-36c955e42a7f?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={submit}
        className="glass rounded-3xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-leaf-800 text-center">Welcome Back</h2>
        <p className="text-center text-leaf-700 mt-1 mb-6">Let's grow together</p>

        <input className="input-field mb-3" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input className="input-field mb-6" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />

        <button disabled={loading} className="btn-primary w-full">
          {loading ? "Logging in..." : "Login "}
        </button>
        <p className="text-center mt-4 text-leaf-700">
          New here? <Link to="/register" className="font-semibold underline">Create account</Link>
        </p>
      </motion.form>

      {/* ============ WELCOME OVERLAY ============ */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center
              bg-gradient-to-br from-leaf-800/95 via-emerald-800/95 to-leaf-900/95
              backdrop-blur-xl"
          >
            <div className="text-center px-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="w-24 h-24 mx-auto rounded-3xl
                  bg-white/15 backdrop-blur-md border border-white/30
                  flex items-center justify-center shadow-2xl"
              >
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Leaf className="w-12 h-12 text-leaf-100" />
                </motion.div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-8 text-4xl md:text-5xl font-extrabold text-white drop-shadow-2xl"
              >
                Welcome back to
                <br />
                <span className="bg-gradient-to-r from-leaf-200 via-emerald-200 to-lime-200 bg-clip-text text-transparent">
                  PlantConnect
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-4 text-xl text-leaf-100 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Hey <b className="text-white">{welcomeName}</b>, good to see you 
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-10 flex items-center justify-center gap-2"
              >
                {[0, 0.15, 0.3].map((d, i) => (
                  <motion.span
                    key={i}
                    animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: d }}
                    className="w-2.5 h-2.5 rounded-full bg-leaf-200"
                  />
                ))}
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-4 text-sm text-leaf-200/80"
              >
                Taking you to your dashboard...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}