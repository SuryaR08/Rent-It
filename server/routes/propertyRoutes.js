const express = require('express');
const { getAllProperties, getPropertyById, addProperty } = require('../controllers/propertyController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getAllProperties);
router.get('/:id', getPropertyById);
router.post('/', authMiddleware, addProperty);

module.exports = router;
