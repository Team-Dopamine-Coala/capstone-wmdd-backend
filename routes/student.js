const express = require('express')

const {
  getStudents,
  getStudent,
  updateStudent
} = require('../controllers/studentController')

const router = express.Router()

// Get all students
router.get('/:classid', getStudents);
// Get a single student
router.get('/:classid/:id', getStudent);
// Update student
router.patch('/:id', updateStudent);

module.exports = router