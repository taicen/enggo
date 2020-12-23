const { model, Schema, Schema: {Types: {ObjectId}} } = require('mongoose');

const schema = new Schema({
  title: {
    type: String,
    default: ''
  },
  // description: {
  //   type: String,
  //   default: ''
  // },
  anons: {
    type: String,
    default: ''
  },
  // text: {
  //   type: String,
  //   default: ''
  // },
  // price: {
  //   type: Number,
  //   default: ''
  // },
  // amount: {
  //   type: Number,
  //   default: ''
  // },
  date: {
    type: Date,
    default: Date.now
  },
  imageUrl: {
    type: Object,
    default: null
  },
  // category: {
  //   type: ObjectId,
  //   ref: 'Category'
  // }
})

module.exports = model('Product', schema)