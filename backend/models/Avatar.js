import mongoose from "mongoose";

const avatarSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Avatar", avatarSchema);
