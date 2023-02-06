const Evaluation = require('../models/evaluationModel');
const mongoose = require('mongoose');

// Get all evaluations by class
const getEvaluationsByClass = async (req, res) => {
  const { classid } = req.params

  const evaluations = await Evaluation.find({ classId: classid }).sort({createdAt: -1})

  res.status(200).json(evaluations)
}

// Get all evaluations by student
const getEvaluationsByStudent = async (req, res) => {
  const { studentid } = req.params

  const evaluations = await Evaluation.find({ studentId: studentid }).sort({createdAt: -1})

  res.status(200).json(evaluations)
}

// Create new evaluation
const createEvaluation = async (req, res) => {
  const { studentId, skillId, rating, date, classId } = req.body

  try {
      const evaluation = await Evaluation.create({ studentId, skillId, rating, date, classId })
      res.status(200).json(evaluation)
  } catch (error) {
      res.status(400).json({ error: error.message })
  }
}

// Update evaluation
const updateEvaluation = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such evaluation' })
    }

    const evaluation = await Evaluation.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!evaluation) {
        return res.status(400).json({ error: 'No such evaluation' })
    }

    res.status(200).json(evaluation)
}

module.exports = {
  getEvaluationsByClass,
  getEvaluationsByStudent,
  createEvaluation,
  updateEvaluation
}