const express = require('express')

const {
  getEvaluationComment,
  createEvaluationComment,
  updateComment
} = require('../controllers/evaluationCommentController')

const router = express.Router()

// Get evaluation comment
router.get('/:classid/:studentid', getEvaluationComment);
// Create evaluation comment
router.post('/', createEvaluationComment);
// Update comment
router.patch('/:id', updateComment);

module.exports = router