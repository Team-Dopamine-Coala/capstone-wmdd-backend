const express = require('express')

const {
  getClasses,
  getClass,
  updateClass
} = require('../controllers/classController')

const router = express.Router()
const { protect } = require('../middleware/authMiddleware')

// Get all classes
router.get('/:userid', protect, getClasses);
// Get single class
router.get('/:userid/:id', protect, getClass);
// Update class
router.patch('/:id', updateClass);

module.exports = router