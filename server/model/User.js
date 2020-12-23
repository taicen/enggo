const { model, Schema, Schema: {Types: {ObjectId}} } = require('mongoose');

const schema = new Schema({
  username: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
})

module.exports = model('User', schema)