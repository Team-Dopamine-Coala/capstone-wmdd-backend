const express = require('express')

const {
  registerUser,
  loginUser,
  getUser
} = require('../controllers/userController')

const router = express.Router()
const { protect } = require('../middleware/authMiddleware')

//Create a new user
router.post('/', registerUser)

//Autenticate a new user
router.post('/login', loginUser)

// Get single user
router.get('/:id', protect, getUser)

module.exports = router