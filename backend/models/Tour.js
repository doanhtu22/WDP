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

const itinerarySchema = new mongoose.Schema({
  day: {
      type: Number,

  },
  detail: {
      type: String,

  }
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
    itineraries: [itinerarySchema],
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
      type: Number,
      required: true,
    },
    quantityMin: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    itineraries: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Itinerary",
      }
    ],
    featured: {
      type: Boolean,
      default: false,
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
