import { UserRepo, TourRepo, BookingRepo } from '../repositories/index.js';

const getDashboardData = async (req, res) => {
  try {
    const userCount = await UserRepo.count();
    const tourCount = await TourRepo.count();
    const bookingCount = await BookingRepo.count();

    res.status(200).json({ userCount, tourCount, bookingCount });
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await UserRepo.list();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};

const getAllTours = async (req, res) => {
  try {
    const tours = await TourRepo.list();
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await BookingRepo.list();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};

export default {
  getDashboardData,
  getAllUsers,
  getAllTours,
  getAllBookings,
};
