const express = require('express');
const { clerkAuthMiddleware } = require('../Middleware/authMiddleware');
const { startSessionController, endSessionController, getSessionById } = require('../Controllers/sessionController');

const router = express.Router();

router.post('/start', clerkAuthMiddleware, startSessionController);
router.post('/end/:id', clerkAuthMiddleware, endSessionController);
router.get('/:id', getSessionById);

module.exports = router;
