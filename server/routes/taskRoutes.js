const express = require('express');
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getIssues,
  createIssue,
  getMilestones,
  createMilestone
} = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/project/:projectId', authMiddleware, getTasks);
router.post('/project/:projectId', authMiddleware, createTask);
router.put('/:taskId', authMiddleware, updateTask);
router.delete('/:taskId', authMiddleware, deleteTask);

router.get('/issues/project/:projectId', authMiddleware, getIssues);
router.post('/issues/project/:projectId', authMiddleware, createIssue);

router.get('/milestones/project/:projectId', authMiddleware, getMilestones);
router.post('/milestones/project/:projectId', authMiddleware, createMilestone);

module.exports = router;
