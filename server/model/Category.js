const { model, Schema, Schema: {Types: {ObjectId}} } = require('mongoose');

const schema = new Schema({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  id: {
    type: Number,
    default: 0
  }
  // products: {
  //   type: ObjectId,
  //   ref: 'Product'
  // }
})

module.exports = model('Category', schema)