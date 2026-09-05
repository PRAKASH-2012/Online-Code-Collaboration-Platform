const express = require('express');
const router = express.Router();
const { runCode, getExecutionHistory } = require('../controllers/executionController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/run', authMiddleware, runCode);
router.get('/history/:projectId', authMiddleware, getExecutionHistory);

module.exports = router;
