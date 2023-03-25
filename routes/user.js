const express = require('express')

const {
  registerUser,
  loginUser,
  getUser,
  comfirmUser
} = require('../controllers/userController')

const router = express.Router()
const { protect } = require('../middleware/authMiddleware')

//Create a new user
router.post('/', registerUser)

//Autenticate a new user
router.post('/login', loginUser)

// Get single user
router.get('/:id', protect, getUser)

//Compare Password in biometrics for Student info
router.post('/bio/:id', comfirmUser)

module.exports = router