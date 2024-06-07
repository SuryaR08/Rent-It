const express = require('express');
const { getUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/:userId', authMiddleware, getUserProfile);

// Additional user routes for updating profile, listing favorites, etc.

module.exports = router;
