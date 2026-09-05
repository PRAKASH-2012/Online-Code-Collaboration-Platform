const express = require('express');
const router = express.Router();
const { askAI, getAIHistory } = require('../controllers/aiController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/prompt', authMiddleware, askAI);
router.get('/history', authMiddleware, getAIHistory);

module.exports = router;
