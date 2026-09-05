const express = require('express');
const router = express.Router();
const {
  createProject,
  getProjects,
  getPublicProjects,
  getProjectById,
  updateProject,
  deleteProject,
  starProject,
  forkProject,
  addMember,
  updateMemberRole,
  removeMember
} = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');
const { checkProjectRole } = require('../middleware/projectAuthMiddleware');

router.get('/', authMiddleware, getProjects);
router.get('/public', getPublicProjects);
router.post('/', authMiddleware, createProject);
router.get('/:id', authMiddleware, getProjectById);
router.put('/:id', authMiddleware, checkProjectRole(['Owner', 'Maintainer']), updateProject);
router.delete('/:id', authMiddleware, checkProjectRole(['Owner']), deleteProject);
router.post('/:id/star', authMiddleware, starProject);
router.post('/:id/fork', authMiddleware, forkProject);
router.post('/:id/members', authMiddleware, checkProjectRole(['Owner', 'Maintainer']), addMember);
router.put('/:id/members/:memberId', authMiddleware, checkProjectRole(['Owner']), updateMemberRole);
router.delete('/:id/members/:memberId', authMiddleware, checkProjectRole(['Owner']), removeMember);

module.exports = router;
