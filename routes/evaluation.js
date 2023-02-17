const express = require('express')

const {
  getEvaluationsByClass,
  getEvaluationsByStudent,
  createEvaluation,
  updateEvaluation
} = require('../controllers/evaluationController')

const router = express.Router()

// Get all evaluation by class
router.get('/:classid', getEvaluationsByClass);
// Get all evaluation by student
router.get('/student/:studentid', getEvaluationsByStudent);
// Create evaluation
router.post('/', createEvaluation);
// Update evaluation
router.patch('/:id', updateEvaluation);

module.exports = router