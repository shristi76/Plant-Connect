import express from "express";
import { chatWithAI, recommendPlants } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/chat", protect, chatWithAI);
router.post("/recommend", protect, recommendPlants);
export default router;