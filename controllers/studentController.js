const Student = require('../models/studentModel');
const mongoose = require('mongoose');

// Get all students
const getStudents = async (req, res) => {
  const { class_id } = req.params

  const students = await Student.find({ class_Id: class_id }).sort({createdAt: -1})

  res.status(200).json(students)
}

// Get a single student
const getStudent = async (req, res) => {
  const { class_id, id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such student' })
  }

  const student = await Student.findOne({ class_Id: class_id, _id: id })

  if (!student) {
      return res.status(404).json({ error: 'No no such student' })
  }

  res.status(200).json(student)
}

module.exports = {
  getStudents,
  getStudent
}