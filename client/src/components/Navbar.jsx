import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, MapPin, Heart, Sparkles, LogOut, LogIn, Home } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/", label: "Home", icon: Home },              // ✅ Added
  { to: "/nurseries", label: "Nurseries", icon: MapPin },
  { to: "/donations", label: "Donate", icon: Heart },
  { to: "/ai", label: "AI Doctor", icon: Sparkles },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 glass backdrop-blur-lg"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Leaf className="w-8 h-8 text-leaf-600" />
          </motion.div>
          <span className="text-2xl font-bold bg-gradient-to-r from-leaf-600 to-leaf-800 bg-clip-text text-transparent">
            PlantConnect
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}   /* ✅ important: only exact match highlights Home */
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-full transition ${
                  isActive
                    ? "bg-leaf-600 text-white shadow-md"
                    : "hover:bg-leaf-100 text-leaf-800"
                }`
              }
            >
              <Icon className="w-4 h-4" /> {label}
            </NavLink>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden sm:block text-sm text-leaf-700">
                Hi, <b>{user.name}</b>
              </span>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="btn-primary !py-2 !px-4 text-sm flex items-center gap-1"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="btn-primary !py-2 !px-4 text-sm flex items-center gap-1"
            >
              <LogIn className="w-4 h-4" /> Login
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
}