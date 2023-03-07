const express = require('express')

const {
  getEvaluationComment,
  createEvaluationComment
} = require('../controllers/evaluationCommentController')

const router = express.Router()

// Get evaluation comment
router.get('/:classid/:studentid', getEvaluationComment);
// Create evaluation comment
router.post('/', createEvaluationComment);

module.exports = router