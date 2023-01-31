const express = require('express')

const {
  getUser
} = require('../controllers/userController')

const router = express.Router()

// Get single user
router.get('/:id', getUser);

module.exports = router