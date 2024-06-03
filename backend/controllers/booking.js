import { BookingRepo } from "../repositories/index.js";
// GET: /bookings
const getBookings = async (req, res) => {
  try {
    res.status(200).json(await BookingRepo.list());
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};

// GET: /bookings/1
const getBookingById = async (req, res) => {
  try {
    res.status(200).json(await BookingRepo.getById(req.params.id));
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};

// POST: /bookings
const createBooking = async (req, res) => {
  try {
    // Get object from request body

    const { cart, startDate, startGate, note, status } = req.body;
    const newBooking = await BookingRepo.create({
      cart,
      startDate,
      startGate,
      note,
      status,
    });
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};

// PUT: /bookings/1
const editBooking = async (req, res) => {
  try {
    res.status(200).json(await BookingRepo.edit(req.params.id, req.body));
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
};

// DELETE: /bookings/1
const deleteBooking = async (req, res) => {
  try {
    res.status(200).json(await BookingRepo.deleteBooking(req.params.id));
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
};

export default {
  getBookings,
  getBookingById,
  createBooking,
  editBooking,
  deleteBooking,
};
