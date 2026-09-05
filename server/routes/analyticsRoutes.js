const express = require('express');
const router = express.Router();
const { getProjectAnalytics } = require('../controllers/analyticsController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/project/:projectId', authMiddleware, getProjectAnalytics);

module.exports = router;
