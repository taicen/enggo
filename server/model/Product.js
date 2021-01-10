const { model, Schema, Schema: {Types: {ObjectId, Mixed}} } = require('mongoose');

const schema = new Schema({
  title: {
    type: String,
    default: ''
  },
  anons: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  },
  category_id: {
    type: Number,
    default: ''
  },
  product_id: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    default: ''
  },
  date: {
    type: Date,
    default: Date.now
  },
  imageUrl: {
    type: Mixed,
    default: {}
  },
  category: {
    type: ObjectId,
    ref: 'Category'
  }
})

module.exports = model('Product', schema)