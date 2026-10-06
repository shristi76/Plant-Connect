import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, MapPin, Mail, LogOut, Save } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../services/api";

export default function AccountMenu({ open, onClose, user, onLogout, onUpdate }) {
  const [form, setForm] = useState({
    name: user?.name || "",
    city: user?.city || "",
    email: user?.email || "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm({
      name: user?.name || "",
      city: user?.city || "",
      email: user?.email || "",
    });
  }, [user]);

  const save = async () => {
    setSaving(true);
    try {
      // If you have a /auth/update endpoint:
      // await api.put("/auth/update", { name: form.name, city: form.city });
      // For now, update locally
      onUpdate?.({ name: form.name, city: form.city });
      toast.success("Settings saved 🌿");
      onClose();
    } catch {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden pointer-events-auto"
            >
              {/* Header */}
              <div className="relative bg-gradient-to-br from-leaf-600 to-emerald-800 px-6 py-6 text-white">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/20 transition"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-2xl font-bold">
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Account settings</h2>
                    <p className="text-leaf-100 text-sm">{user?.email}</p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-leaf-700 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" /> Full name
                  </label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-leaf-200 focus:border-leaf-500 focus:outline-none text-leaf-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-leaf-700 mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" /> Email
                  </label>
                  <input
                    value={form.email}
                    disabled
                    className="w-full px-4 py-2.5 rounded-xl border border-leaf-100 bg-leaf-50 text-leaf-500 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-leaf-700 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> City
                  </label>
                  <input
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="e.g. Mumbai, Delhi..."
                    className="w-full px-4 py-2.5 rounded-xl border border-leaf-200 focus:border-leaf-500 focus:outline-none text-leaf-900"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 pb-6 flex items-center gap-3">
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
                <button
                  onClick={save}
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-leaf-600 to-emerald-700 hover:from-leaf-700 hover:to-emerald-800 text-white font-medium transition disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : "Save changes"}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}