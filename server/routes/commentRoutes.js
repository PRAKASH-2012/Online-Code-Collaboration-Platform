const express = require('express');
const router = express.Router();
const { getComments, createComment, resolveComment } = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/project/:projectId', authMiddleware, getComments);
router.post('/project/:projectId', authMiddleware, createComment);
router.put('/:commentId/resolve', authMiddleware, resolveComment);

module.exports = router;
