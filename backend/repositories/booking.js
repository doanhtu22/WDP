import Booking from "../models/Booking.js";
// Create
const create = async ({ cart, startDate, startGate, note, status }) => {
  try {
    // Create new booking
    const newBooking = await Booking.create({
      cart,
      startDate,
      startGate,
      note,
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
    return await Booking.find({}).exec();
  } catch (error) {
    throw new Error(error.toString());
  }
};

const getById = async (id) => {
  try {
    return await Booking.findOne({ _id: id }).exec();
  } catch (error) {
    throw new Error(error.toString());
  }
};

const edit = async (id, { cart, startDate, startGate, note, status }) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      { _id: id },
      {
        cart,
        startDate,
        startGate,
        note,
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
