const express = require('express')

const {
  getProgram
} = require('../controllers/programController')

const router = express.Router()

// Get single program
router.get('/:id', getProgram);

module.exports = router