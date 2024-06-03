import express from "express";
import { BookingController } from "../controllers/index.js";

const bookingRouter = express.Router();

// GET: /bookings -> Get all bookings
bookingRouter.get("/", BookingController.getBookings);

// GET: /bookings/:id -> Get booking by Id
bookingRouter.get("/:id", BookingController.getBookingById);

// POST: /bookings -> Create a new booking
bookingRouter.post("/", BookingController.createBooking);

// PUT: /bookings/:id
bookingRouter.put("/:id", BookingController.editBooking);

// DELETE: /bookings/:id
bookingRouter.delete("/:id", BookingController.deleteBooking);

export default bookingRouter;
