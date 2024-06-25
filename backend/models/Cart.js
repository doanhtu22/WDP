import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
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
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
