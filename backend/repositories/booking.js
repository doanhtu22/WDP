import Booking from "../models/Booking.js";
// Create
const create = async ({
  user,
  tour,
  quantity,
  startDate,
  startGate,
  payDate,
  status,
}) => {
  try {
    // Create new booking
    const newBooking = await Booking.create({
      user,
      tour,
      quantity,
      startDate,
      startGate,
      payDate,
      status,
    });
    // Return newBooking object
    return newBooking._doc;
  } catch (error) {
    throw new Error(error.toString());
  }
};
// Get all bookings
const list = async () => {
  try {
    return await Booking.find({}).populate("tour").exec();
  } catch (error) {
    throw new Error(error.toString());
  }
};

const getById = async (id) => {
  try {
    return await Booking.findOne({ _id: id }).populate("tour").exec();
  } catch (error) {
    throw new Error(error.toString());
  }
};

const edit = async (
  id,
  { user, tour, quantity, startDate, startGate, payDate, status }
) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      { _id: id },
      {
        user,
        tour,
        quantity,
        startDate,
        startGate,
        payDate,
        status,
      },
      { new: true }
    );

    if (!updatedBooking) {
      throw new Error("Booking not found");
    }

    return updatedBooking;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const deleteBooking = async (id) => {
  try {
    return await Booking.findByIdAndDelete({ _id: id });
  } catch (error) {
    throw new Error(error.toString());
  }
};
export default {
  create,
  list,
  getById,
  edit,
  deleteBooking,
};
