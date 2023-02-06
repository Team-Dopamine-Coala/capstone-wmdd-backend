const Program = require('../models/programModel');
const mongoose = require('mongoose');

// Get a single program
const getProgram = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such program' })
  }

  const program = await Program.findOne({ _id: id })

  if (!program) {
      return res.status(404).json({ error: 'No such program' })
  }

  res.status(200).json(program)
}

module.exports = {
  getProgram
}