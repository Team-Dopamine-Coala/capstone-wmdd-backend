const EvaluationComment = require('../models/evaluationCommentModel');
const mongoose = require('mongoose');

// Get evaluation comment by student id and class id
const getEvaluationComment = async (req, res) => {
  const { classid, studentid } = req.params

  const evaluationComment = await EvaluationComment.find({ classId: classid, studentId: studentid }).sort({createdAt: -1})

  res.status(200).json(evaluationComment)
}

// Create new evaluation
const createEvaluationComment = async (req, res) => {
  const { studentId, classId, comment } = req.body

  try {
      const evaluationComment = await EvaluationComment.create({ studentId, classId, comment })
      res.status(200).json(evaluationComment)
  } catch (error) {
      res.status(400).json({ error: error.message })
  }
}

module.exports = {
  getEvaluationComment,
  createEvaluationComment
}