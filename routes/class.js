const express = require('express')

const {
  getClasses,
  getClass,
} = require('../controllers/classController')

const router = express.Router()

// Get all classes
router.get('/:userid', getClasses);
// Get single class
router.get('/:userid/:id', getClass);

module.exports = router