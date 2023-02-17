const express = require('express')

const {
  getSkills,
  getSkill
} = require('../controllers/skillController')

const router = express.Router()

// Get all skills
router.get('/', getSkills);
// Get a single skill
router.get('/:id', getSkill);

module.exports = router