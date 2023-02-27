const express = require('express')

const {
  registerUser,
  loginUser,
  getUser
} = require('../controllers/userController')

const router = express.Router()

//Create a new user
router.post('/', registerUser)

//Autenticate a new user
router.post('/login', loginUser)

// Get single user
router.get('/:id', getUser)

module.exports = router