import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Star } from "lucide-react";
import toast from "react-hot-toast";
import api from "../services/api";
import Loader from "../components/Loader";

export default function NurseryFinder() {
  const [nurseries, setNurseries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [radius, setRadius] = useState(10);

  const load = async (lat, lng) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/nurseries/nearby?lat=${lat}&lng=${lng}&radius=${radius}`);
      setNurseries(data);
      if (!data.length) toast("No nurseries nearby. Showing all.");
    } catch {
      const { data } = await api.get("/nurseries");
      setNurseries(data);
    } finally { setLoading(false); }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (p) => load(p.coords.latitude, p.coords.longitude),
        async () => { const { data } = await api.get("/nurseries"); setNurseries(data); setLoading(false); }
      );
    } else {
      api.get("/nurseries").then((r) => { setNurseries(r.data); setLoading(false); });
    }
    // eslint-disable-next-line
  }, [radius]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-leaf-800">
        🌳 Nearby Nurseries
      </motion.h1>
      <p className="text-leaf-600 mt-2">Find plant shops within {radius} km of you.</p>

      <div className="mt-4 flex items-center gap-3">
        <label className="text-leaf-700">Radius: {radius} km</label>
        <input type="range" min="1" max="50" value={radius} onChange={(e) => setRadius(e.target.value)} className="accent-leaf-600" />
      </div>

      {loading ? <Loader label="Searching nearby..." /> : (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nurseries.map((n, i) => (
            <motion.div
              key={n._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="glass rounded-2xl p-6"
            >
              <div className="text-4xl">🏡</div>
              <h3 className="text-xl font-bold text-leaf-800 mt-2">{n.name}</h3>
              <p className="text-sm text-leaf-600 flex items-center gap-1 mt-1">
                <MapPin className="w-4 h-4" /> {n.address || n.city}
              </p>
              {n.phone && <p className="text-sm text-leaf-700 flex items-center gap-1 mt-1"><Phone className="w-4 h-4" /> {n.phone}</p>}
              <p className="text-sm text-amber-600 flex items-center gap-1 mt-2"><Star className="w-4 h-4 fill-amber-500" /> {n.rating}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {n.plants?.slice(0, 4).map((p, idx) => (
                  <span key={idx} className="bg-leaf-100 text-leaf-800 text-xs px-2 py-1 rounded-full">{p.name} ₹{p.price}</span>
                ))}
              </div>
            </motion.div>
          ))}
          {!nurseries.length && <p className="text-leaf-700">No nurseries found. Try increasing radius.</p>}
        </div>
      )}
    </div>
  );
}