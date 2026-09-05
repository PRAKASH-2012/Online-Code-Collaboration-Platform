const express = require('express');
const router = express.Router();
const { getReviews, createReview, updateReviewStatus } = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/project/:projectId', authMiddleware, getReviews);
router.post('/project/:projectId', authMiddleware, createReview);
router.put('/:reviewId/status', authMiddleware, updateReviewStatus);

module.exports = router;
