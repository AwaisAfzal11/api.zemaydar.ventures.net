const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

// @route   POST /api/auth/signup
// @desc    Admin creates a new user account
// @access  Private (Admin only)
router.post('/signup', protect, admin, registerUser);

// @route   POST /api/auth/login
// @desc    Client or admin login
// @access  Public
router.post('/login', loginUser);

module.exports = router;