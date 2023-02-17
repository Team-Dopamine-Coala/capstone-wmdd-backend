const Attendance = require('../models/attendanceModel');
const mongoose = require('mongoose');

// Get all attendance
const getAttendances = async (req, res) => {
  const { classid } = req.params

  const attendances = await Attendance.find({ classId: classid }).sort({createdAt: -1})

  res.status(200).json(attendances)
}

// Get a single attendance
const getAttendance = async (req, res) => {
  const { classid, id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such attendance' })
  }

  const attendanceSingle = await Attendance.findOne({ classId: classid, _id: id })

  if (!attendanceSingle) {
      return res.status(404).json({ error: 'No such attendance' })
  }

  res.status(200).json(attendanceSingle)
}

// Create new attendance
const createAttendance = async (req, res) => {
  const { date, present, studentId, classId } = req.body

  try {
      const attendance = await Attendance.create({ date, present, studentId, classId })
      res.status(200).json(attendance)
  } catch (error) {
      res.status(400).json({ error: error.message })
  }
}

// Update attendance
const updateAttendance = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such attendace' })
    }

    const attendance = await Attendance.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!attendance) {
        return res.status(400).json({ error: 'No such attendance' })
    }

    res.status(200).json(attendance)
}

module.exports = {
  getAttendances,
  getAttendance,
  createAttendance,
  updateAttendance
}