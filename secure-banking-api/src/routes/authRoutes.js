const express = require('express');
const router = express.Router();

const { register, login, refreshToken, logout, getMe, promoteToAdmin } = require('../controllers/authController');
const { protect } = require('../middlewares/auth');
const { validate } = require('../middlewares/validate');
const { authLimiter } = require('../middlewares/rateLimiter');
const { registerSchema, loginSchema, refreshSchema } = require('../validators/authValidators');

// Public routes — apply strict rate limiter
router.post('/register', authLimiter, validate(registerSchema), register);
router.post('/login', authLimiter, validate(loginSchema), login);
router.post('/refresh', authLimiter, validate(refreshSchema), refreshToken);

// Protected routes
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);

// Admin management — only existing admins can promote others
const { roleGuard } = require('../middlewares/roleGuard');
router.patch('/promote-admin', protect, roleGuard('admin'), promoteToAdmin);

module.exports = router;
