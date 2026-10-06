import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import nurseryRoutes from "./routes/nurseryRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json({ limit: "5mb" }));

app.get("/", (_, res) => res.json({ status: "🌱 PlantConnect API running" }));
app.use("/api/auth", authRoutes);
app.use("/api/nurseries", nurseryRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));