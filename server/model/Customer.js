const { model, Schema, Schema: {Types: {ObjectId}} } = require('mongoose');

const schema = new Schema({
  room: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  link: {
    type: String,
    default: ''
  }
})

module.exports = model('Customer', schema)
