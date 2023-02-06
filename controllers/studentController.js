const Student = require('../models/studentModel');
const mongoose = require('mongoose');

// Get all students
const getStudents = async (req, res) => {
  const { classid } = req.params

  const students = await Student.find({ classId: classid }).sort({createdAt: -1})

  res.status(200).json(students)
}

// Get a single student
const getStudent = async (req, res) => {
  const { classid, id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such student' })
  }

  const student = await Student.findOne({ classId: classid, _id: id })

  if (!student) {
      return res.status(404).json({ error: 'No such student' })
  }

  res.status(200).json(student)
}

module.exports = {
  getStudents,
  getStudent
}