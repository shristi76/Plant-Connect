import mongoose from "mongoose";

const aiChatSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    question: String,
    answer: String,
    category: { type: String, default: "general" }, // plants | fertilizer | care
  },
  { timestamps: true }
);

export default mongoose.model("AIChat", aiChatSchema);