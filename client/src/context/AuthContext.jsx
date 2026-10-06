import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("pc_token");
    if (token) {
      api.get("/auth/me").then((r) => setUser(r.data)).catch(() => localStorage.removeItem("pc_token")).finally(() => setLoading(false));
    } else setLoading(false);
  }, []);

  const login = (data) => {
    localStorage.setItem("pc_token", data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("pc_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);