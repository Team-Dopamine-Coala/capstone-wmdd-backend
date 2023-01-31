const User = require('../models/userModel');
const mongoose = require('mongoose');

// Get user
const getUser = async (req, res) => {
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
}

module.exports = {
  getUser
}