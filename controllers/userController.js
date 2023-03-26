const User = require('../models/userModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler');

//Create a new user
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  //check for if all fields are inputted
  if (!firstName || !lastName || !email || !password) {
   return res.status(400).json({error: 'Please input all fields'})
  }

  //find this user from userID
  // const userExists = await User.findOne({email})
  const userExists = await User.findOne({email})

  if(userExists){
    return res.status(404).json({error: 'User already exists'})
  }

  //Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //Create new user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword
  })

  if(user){
    return res.status(201).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      token: generateToken(user._id)
    })
  } else {
    return res.status(400).json({error: 'Invalid user data'})
  }
}

//Authenticate user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  //Look for user via email
  const user = await User.findOne({ email })

  if(user && (await bcrypt.compare(password, user.password))){
    return res.json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      photoUrl: user.photoUrl,
      token: generateToken(user._id)
    })
  } else {
    return res.status(400).json({error: `Couldn't find these credentials`})
  }
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
    firstname: user.firstName,
    lastname: user.lastName,
    email: user.email,
    photoUrl: user.photoUrl,
    password: user.password
  })
})

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, 'test1234', {
    expiresIn: '30d'
  })
}

module.exports = {
  getUser,
  loginUser,
  registerUser
}