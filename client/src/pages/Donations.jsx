import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, MapPin, Plus } from "lucide-react";
import toast from "react-hot-toast";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

export default function Donations() {
  const { user } = useAuth();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", plantType: "", description: "", quantity: 1, city: "" });

  const load = async () => {
    setLoading(true);
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (p) => {
            const { data } = await api.get(`/donations/nearby?lat=${p.coords.latitude}&lng=${p.coords.longitude}&radius=25`);
            setList(data);
            setLoading(false);
          },
          async () => { setLoading(false); }
        );
      } else setLoading(false);
    } catch { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please login");
    try {
      const pos = await new Promise((res, rej) =>
        navigator.geolocation.getCurrentPosition(res, rej, { timeout: 5000 })
      );
      await api.post("/donations", { ...form, lat: pos.coords.latitude, lng: pos.coords.longitude });
      toast.success("Donation posted! 🌱");
      setShowForm(false);
      setForm({ title: "", plantType: "", description: "", quantity: 1, city: "" });
      load();
    } catch {
      toast.error("Please allow location");
    }
  };

  const claim = async (id) => {
    if (!user) return toast.error("Login to claim");
    try {
      await api.put(`/donations/claim/${id}`);
      toast.success("Claimed! Contact the donor 📞");
      load();
    } catch { toast.error("Failed"); }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-leaf-800">
            💚 Neighbour Donations
          </motion.h1>
          <p className="text-leaf-600 mt-2">Share cuttings, saplings & plant parts with your community.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" /> {showForm ? "Cancel" : "Donate a Plant"}
        </button>
      </div>

      {showForm && (
        <motion.form
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={create}
          className="glass rounded-2xl p-6 mt-6 grid md:grid-cols-2 gap-3"
        >
          <input className="input-field" placeholder="Title (e.g. Money Plant cuttings)" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <input className="input-field" placeholder="Plant Type" value={form.plantType} onChange={(e) => setForm({ ...form, plantType: e.target.value })} />
          <input className="input-field md:col-span-2" placeholder="Description / pickup info" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <input className="input-field" type="number" min="1" placeholder="Quantity" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
          <input className="input-field" placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
          <button className="btn-primary md:col-span-2">Post Donation 🌱</button>
        </motion.form>
      )}

      {loading ? <Loader label="Finding donations near you..." /> : (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((d, i) => (
            <motion.div
              key={d._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-2">
                <span className="text-3xl">🪴</span>
                <h3 className="text-lg font-bold text-leaf-800">{d.title}</h3>
              </div>
              <p className="text-sm text-leaf-600 mt-2">{d.description}</p>
              <p className="text-xs text-leaf-700 mt-2 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {d.city || "Nearby"} · Qty: {d.quantity}
              </p>
              <p className="text-xs text-leaf-500 mt-1">By {d.donor?.name}</p>
              <button onClick={() => claim(d._id)} className="mt-4 w-full btn-primary !py-2 flex items-center justify-center gap-2">
                <Heart className="w-4 h-4" /> Claim
              </button>
            </motion.div>
          ))}
          {!list.length && <p className="text-leaf-700">No donations nearby yet. Be the first to donate! 💚</p>}
        </div>
      )}
    </div>
  );
}