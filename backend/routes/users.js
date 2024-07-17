import express from 'express';
import { getAllUser, getSingleUser, updateUser, banUser } from '../Controllers/userController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Update user with file upload
router.put('/:id', upload.any(), updateUser);

// Get single user
router.get('/:id', getSingleUser);

// Get all users
router.get('/', getAllUser);

// Ban user
router.put('/:id/ban', banUser);

export default router;
