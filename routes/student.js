const express = require('express')

const {
  getStudents,
  getStudent
} = require('../controllers/studentController')

const router = express.Router()

// Get all students
router.get('/:classid', getStudents);
// Get a single student
router.get('/:classid/:id', getStudent);

module.exports = router