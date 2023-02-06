const Skill = require('../models/skillModel');
const mongoose = require('mongoose');

// Get all skills
const getSkills = async (req, res) => {
  const skills = await Attendance.find().sort({createdAt: -1})

  res.status(200).json(skills)
}

// Get a single skill
const getSkill = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such skill' })
  }

  const skill = await Skill.findOne({ _id: id })

  if (!skill) {
      return res.status(404).json({ error: 'No such skill' })
  }

  res.status(200).json(skill)
}

module.exports = {
  getSkills,
  getSkill
}