const { model, Schema, Schema: {Types: {ObjectId}} } = require('mongoose');

const schema = new Schema({
  token: {
    type: String,
    default: ''
  },
  link: {
    type: String,
    default: ''
  },
  user: {
    type: ObjectId,
    ref: 'User'
  }
})

module.exports = model('Token', schema)
