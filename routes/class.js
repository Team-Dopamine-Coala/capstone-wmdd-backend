const express = require('express')

const {
  getClasses,
  getClass,
} = require('../controllers/classController')

const router = express.Router()
const { protect } = require('../middleware/authMiddleware')

// Get all classes
router.get('/:userid', protect, getClasses);
// Get single class
router.get('/:userid/:id', protect, getClass);

module.exports = router