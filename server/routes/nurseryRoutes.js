import express from "express";
import {
  getNearbyNurseries,
  createNursery,
  getAllNurseries,
} from "../controllers/nurseryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", getAllNurseries);
router.get("/nearby", getNearbyNurseries);
router.post("/", protect, createNursery);
export default router;