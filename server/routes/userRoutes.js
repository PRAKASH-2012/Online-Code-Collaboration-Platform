const express = require('express');
const router = express.Router();
const { searchUsers, getLeaderboard, getPersonalAnalytics } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/search', authMiddleware, searchUsers);
router.get('/leaderboard', authMiddleware, getLeaderboard);
router.get('/analytics', authMiddleware, getPersonalAnalytics);

module.exports = router;
