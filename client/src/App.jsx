import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NurseryFinder from "./pages/NurseryFinder";
import Donations from "./pages/Donations";
import AIAssistant from "./pages/AIAssistant";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/nurseries" element={<NurseryFinder />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/ai" element={<AIAssistant />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}