import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    cart: {
      type: mongoose.Types.ObjectId,
      ref: "Cart",
    },

    note: {
      type: String,
      required: true,
    },
    //chưa thanh toán, đã thanh toán, đã đi,
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);