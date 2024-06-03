import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: [avatarSchema],
    phone: {
      type: Number,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: Boolean,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    // căn cước công dân
    cccd: {
      type: String,
      required: true,
    },
    favourite_tours: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Tours",
      },
    ],
    history_tours: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Tours",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
