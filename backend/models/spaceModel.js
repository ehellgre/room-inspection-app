const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Schema for spaces. Includes name and address for the space
const spaceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Space', spaceSchema)