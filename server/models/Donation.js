import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    donor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true }, // e.g. "Money Plant cuttings"
    plantType: String,
    description: String,
    image: String,
    quantity: { type: Number, default: 1 },
    status: { type: String, enum: ["available", "claimed", "completed"], default: "available" },
    claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true },
    },
    city: String,
  },
  { timestamps: true }
);

donationSchema.index({ location: "2dsphere" });

export default mongoose.model("Donation", donationSchema);