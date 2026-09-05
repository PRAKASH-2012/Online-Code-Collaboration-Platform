const express = require('express');
const router = express.Router();
const { createOrg, getOrgs, createTeam } = require('../controllers/orgController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getOrgs);
router.post('/', authMiddleware, createOrg);
router.post('/teams', authMiddleware, createTeam);

module.exports = router;
