const Student = require('../models/studentModel');
const mongoose = require('mongoose');

// Get all students
const getStudents = async (req, res) => {
  const { classid } = req.params

  const students = await Student.find({ class_id: classid }).sort({createdAt: -1})

  if (!students) {
    return res.status(404).json({ error: 'No such students' })
  }

  res.status(200).json(students)
}

// Get a single student
const getStudent = async (req, res) => {
  const { class_id, id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such student' })
  }

  const student = await Student.findOne({ class_id: class_id, _id: id })

  if (!student) {
      return res.status(404).json({ error: 'No no such student' })
  }

  res.status(200).json(student)
}

// Update student
const updateStudent = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such student' })
  }

  const student = await Student.findOneAndUpdate({_id: id}, {
      ...req.body
  })

  if (!student) {
      return res.status(400).json({ error: 'No such student' })
  }

  res.status(200).json(student)
}

module.exports = {
  getStudents,
  getStudent,
  updateStudent
}