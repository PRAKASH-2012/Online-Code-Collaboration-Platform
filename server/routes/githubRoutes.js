const express = require('express');
const router = express.Router();
const { importGitHubRepo, exportGitHubRepo } = require('../controllers/githubController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/import', authMiddleware, importGitHubRepo);
router.post('/export', authMiddleware, exportGitHubRepo);

module.exports = router;
