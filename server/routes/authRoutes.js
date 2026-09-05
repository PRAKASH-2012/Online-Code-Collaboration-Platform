const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile, getSessions } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);
router.get('/sessions', authMiddleware, getSessions);

module.exports = router;
