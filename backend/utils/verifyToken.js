import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();

export const verifyUser = (req, res, next) => {
   verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.role === 'admin') {
         next();
      } else {
         return res.status(401).json({ success: false, message: "You are not authenticated" });
      }
   });
};

export const verifyToken = (req, res, next) => {
   const token = req.headers['authorization'];

   if (!token) {
      return res.status(403).json({ success: false, message: 'No token provided!' });
   }

   jwt.verify(token.split(' ')[1], process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
         return res.status(500).json({ success: false, message: 'Failed to authenticate token.' });
      }
      req.userId = decoded.id;
      req.userRole = decoded.role;
      next();
   });
};

export const verifyAdmin = async (req, res, next) => {
   try {
      const user = await User.findById(req.userId);
      if (user.role !== 'admin') {
         return res.status(403).json({ success: false, message: 'Require Admin Role!' });
      }
      next();
   } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to verify user role.' });
   }
};
