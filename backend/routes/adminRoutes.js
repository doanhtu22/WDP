import express from 'express';
import authenticateAdmin from '../authMiddleware.js';
import { AdminController } from '../controllers/index.js';

const router = express.Router();

// Middleware to authenticate admin
router.use(authenticateAdmin);

// Admin dashboard routes
router.get('/', AdminController.getDashboardData);
router.get('/users', AdminController.getAllUsers);
router.get('/tours', AdminController.getAllTours);
router.get('/bookings', AdminController.getAllBookings);

export default router;
