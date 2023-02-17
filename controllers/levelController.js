const Level = require('../models/levelModel');
const mongoose = require('mongoose');

// Get a single level
const getLevel = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such level' })
  }

  const level = await Level.findOne({ _id: id })

  if (!level) {
      return res.status(404).json({ error: 'No such level' })
  }

  res.status(200).json(level)
}

module.exports = {
  getLevel
}