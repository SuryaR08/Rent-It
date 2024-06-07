const express = require('express');
const { getAllProperties, addProperty } = require('../controllers/propertyController');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Set up multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

router.get('/', getAllProperties);
router.post('/', upload.single('image'), addProperty);

module.exports = router;
