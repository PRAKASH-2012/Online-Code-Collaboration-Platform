const express = require('express');
const router = express.Router();
const { createSnapshot, getSnapshots, restoreSnapshot, getVersionHistory } = require('../controllers/versionController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/snapshots/project/:projectId', authMiddleware, getSnapshots);
router.post('/snapshots/project/:projectId', authMiddleware, createSnapshot);
router.post('/snapshots/:snapshotId/restore', authMiddleware, restoreSnapshot);
router.get('/history/file/:fileId', authMiddleware, getVersionHistory);

module.exports = router;
