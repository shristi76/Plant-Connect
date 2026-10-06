import mongoose from "mongoose";

const nurserySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    address: String,
    city: String,
    phone: String,
    plants: [{ name: String, price: Number, image: String, stock: Number }],
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true }, // [lng, lat]
    },
    rating: { type: Number, default: 4.5 },
  },
  { timestamps: true }
);

nurserySchema.index({ location: "2dsphere" });

export default mongoose.model("Nursery", nurserySchema);