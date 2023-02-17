const express = require('express')

const {
  getAttendances,
  getAttendance,
  createAttendance,
  updateAttendance
} = require('../controllers/attendanceController')

const router = express.Router()

// Get all attendance
router.get('/:classid', getAttendances);
// Get single attendace
router.get('/:classid/:id', getAttendance);
// Create attendance
router.post('/', createAttendance);
// Update attendance
router.patch('/:id', updateAttendance);

module.exports = router