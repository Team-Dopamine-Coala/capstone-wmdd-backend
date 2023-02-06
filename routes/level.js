const express = require('express')

const {
  getLevel
} = require('../controllers/levelController')

const router = express.Router()

// Get single level
router.get('/:id', getLevel);

module.exports = router