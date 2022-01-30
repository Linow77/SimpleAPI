const mongoose = require('mongoose')

const TipsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Tips', TipsSchema)
