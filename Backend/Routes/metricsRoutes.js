const express = require('express');
const { getMetrics } = require('../Controllers/metricsController');
const { clerkAuthMiddleware } = require('../Middleware/authMiddleware');
const router = express.Router();

router.get('/', clerkAuthMiddleware,getMetrics);

module.exports = router;