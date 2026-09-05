const express = require('express');
const router = express.Router();
const { getFiles, createFile, updateFile, renameFile, deleteFile } = require('../controllers/fileController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/project/:projectId', authMiddleware, getFiles);
router.post('/project/:projectId', authMiddleware, createFile);
router.put('/:fileId', authMiddleware, updateFile);
router.put('/:fileId/rename', authMiddleware, renameFile);
router.delete('/:fileId', authMiddleware, deleteFile);

module.exports = router;
