import express from 'express';
const router = express.Router();
import authController from '../controllers/authController.js';
import authMiddleware from '../middleware/auth.js';

const { 
  register, 
  login, 
  getMe, 
  refreshToken 
} = authController;

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshToken);

// Protected routes
router.get('/me', authMiddleware, getMe);

export default router;