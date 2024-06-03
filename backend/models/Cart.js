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
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
