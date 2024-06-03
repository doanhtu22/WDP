import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
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

const feedbackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: [imageSchema],
    feedback: [feedbackSchema],
    price: {
      type: Number,
      required: true,
    },
    code_tour: {
      type: String,
      required: true,
    },
    //vd: 3 ngày 2 đêm
    time: {
      type: String,
      required: true,
    },
    //máy bay, oto
    vehicle: {
      type: String,
      required: true,
    },
    quantityMax: {
      type: String,
      required: true,
    },
    quantityMin: {
      type: Stirng,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    //quanh năm hay tháng ....
    timeSuggest: {
      type: String,
      required: true,
    },
    // mọi lứa tuổi, trẻ con hay người già, cặp đôi, ....
    user_suggest: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tour", tourSchema);
