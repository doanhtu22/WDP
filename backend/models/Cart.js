import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    tour: {
      type: mongoose.Types.ObjectId,
      ref: "Tour",
    },
    quantity: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    startGate: {
      type: String,
      required: true,
    },
    payDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Cart", userSchema);
