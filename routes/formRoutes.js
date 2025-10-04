const express = require('express');
const router = express.Router();
const { handleDataForm, handleFileUpload, upload } = require('../controllers/formController');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/forms/data-gathering
// @desc    Handles the public data form submission
// @access  Public
router.post('/data-gathering', handleDataForm);

// @route   POST /api/forms/upload
// @desc    Handles file upload from the client dashboard
// @access  Private (Logged-in clients)
router.post('/upload', protect, upload.single('file'), handleFileUpload);

module.exports = router;