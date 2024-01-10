const Space = require('../models/spaceModel')
const mongoose = require('mongoose')


// get all spaces
const getSpaces = async (req, res) => {
  const space = await Space.find({}).sort({createdAt: -1})

  res.status(200).json(space)
}


// get a single space
const getSpace = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Tätä tilaa ei löydy'})
  }

  const space = await Space.findById(id)

  if (!space) {
    return res.status(404).json({error: 'Tätä tilaa ei löydy'})
  }

  res.status(200).json(space)
}


// create a new space
const createSpace = async (req, res) => {
  const {name, address} = req.body

  let emptyFields = []

  if (!name) {
    emptyFields.push('name')
  }
  if (!address) {
    emptyFields.push('address')
  }
 
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'täytä kaikki kentät', emptyFields })
  }

  // add to the database
  try {
    const space = await Space.create({ name, address })
    res.status(200).json(space)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}


// delete a space
const deleteSpace = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'Tätä tilaa ei löydy'})
  }

  const space = await Space.findOneAndDelete({_id: id})

  if(!space) {
    return res.status(400).json({error: 'Tätä tilaa ei löydy'})
  }

  res.status(200).json(space)
}


// update a space
const updateSpace = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'Tätä tilaa ei löydy'})
  }

  const space = await Space.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!space) {
    return res.status(400).json({error: 'Tätä tilaa ei löydy'})
  }

  res.status(200).json(space)
}


module.exports = {
  getSpaces,
  getSpace,
  createSpace,
  deleteSpace,
  updateSpace
}