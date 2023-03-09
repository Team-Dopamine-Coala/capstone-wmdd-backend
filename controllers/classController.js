const Class = require('../models/classModel');
const mongoose = require('mongoose');

// Get all classes
const getClasses = async (req, res) => {
  const { userid } = req.params

  const classes = await Class.find({ userId: userid }).sort({createdAt: -1})

  res.status(200).json(classes)
}

// Get a single class
const getClass = async (req, res) => {
  const { userid, id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such class' })
  }

  const classSingle = await Class.findOne({ userId: userid, _id: id })

  if (!classSingle) {
      return res.status(404).json({ error: 'No such class' })
  }

  res.status(200).json(classSingle)
}

// Update class
const updateClass = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such class' })
  }

  const theclass = await Class.findOneAndUpdate({_id: id}, {
      ...req.body
  })

  if (!theclass) {
      return res.status(400).json({ error: 'No such attendance' })
  }

  res.status(200).json(theclass)
}


module.exports = {
  getClasses,
  getClass,
  updateClass
}