const express = require('express');
const { clerkAuthMiddleware } = require('../Middleware/authMiddleware');
const { getMe } = require('../Controllers/authController');

const router = express.Router();

router.get('/me', clerkAuthMiddleware, getMe);

module.exports = router;
