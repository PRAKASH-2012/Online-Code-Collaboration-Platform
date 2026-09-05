const Review = require('../models/Review');

const getReviews = async (req, res) => {
  try {
    const { projectId } = req.params;
    const reviews = await Review.find({ project: projectId })
      .populate('reviewer', 'username fullName avatar')
      .populate('author', 'username fullName avatar');
    res.json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createReview = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title, description, reviewerId } = req.body;

    const review = await Review.create({
      project: projectId,
      title,
      description,
      reviewer: reviewerId,
      author: req.user.id,
      status: 'Pending'
    });

    res.status(201).json({ success: true, review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateReviewStatus = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { status } = req.body;
    const review = await Review.findByIdAndUpdate(reviewId, { status }, { new: true });
    res.json({ success: true, review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getReviews, createReview, updateReviewStatus };
