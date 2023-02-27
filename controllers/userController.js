const User = require('../models/userModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler');

//Create a new user
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  if(!firstName || !lastName || !email || !password) {
   return res.status(400).json({error: 'Please input all fields'})
  }

  res.json({message: 'Register User'})
}

//Authenticate user
const loginUser = asyncHandler(async (req, res) => {
  res.json({message: 'Login User'})
})

// Get user
const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such user' })
  }

  const user = await User.findOne({ _id: id})

  if (!user) {
      return res.status(404).json({ error: 'No such user' })
  }

  res.status(200).json({
    _id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    password: user.password
  })
})

module.exports = {
  getUser,
  loginUser,
  registerUser
}