const express = require('express');
const router = express.Router();
const { getAdminStats, getUsersList, toggleSuspendUser, getAdminLogs, getReports, createReport } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/stats', authMiddleware, adminMiddleware, getAdminStats);
router.get('/users', authMiddleware, adminMiddleware, getUsersList);
router.put('/users/:userId/suspend', authMiddleware, adminMiddleware, toggleSuspendUser);
router.get('/logs', authMiddleware, adminMiddleware, getAdminLogs);
router.get('/reports', authMiddleware, adminMiddleware, getReports);
router.post('/reports', authMiddleware, createReport);

module.exports = router;
