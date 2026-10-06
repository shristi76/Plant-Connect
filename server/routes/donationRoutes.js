import express from "express";
import {
  createDonation,
  getNearbyDonations,
  claimDonation,
  getMyDonations,
} from "../controllers/donationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/nearby", getNearbyDonations);
router.get("/mine", protect, getMyDonations);
router.post("/", protect, createDonation);
router.put("/claim/:id", protect, claimDonation);
export default router;