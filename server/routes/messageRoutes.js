const express = require('express');
const router = express.Router();
const { getMessages, sendMessage, getDirectMessages, sendDirectMessage } = require('../controllers/messageController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/project/:projectId', authMiddleware, getMessages);
router.post('/project/:projectId', authMiddleware, sendMessage);
router.get('/direct/:recipientId', authMiddleware, getDirectMessages);
router.post('/direct', authMiddleware, sendDirectMessage);

module.exports = router;
