const Boom = require('@hapi/boom');
const fs = require('fs');

const genericCrud = (model) => ({
  async get({ params: {id} }, res) {
    try {
      const item = await model.findById(id)
      return res.send(item)
    } catch(error) {
      res.status(400).send(Boom.boomify(error))
    }
  },
  async getAll(req, res) {
    try {
      const items = await model.find()
      return res.send({items})
    } catch(error) {
      res.status(400).send(Boom.boomify(error))
    }
  },
  async create({body, file}, res) {
    console.log("create -> body ", body)
    try {
      const item = new model(file ? {...body, imageUrl: file.path} : body)
      const newItem = await item.save()
      return res.send({newItem})
    } catch(error) {
      res.status(400).send(Boom.boomify(error))
    }
  },
  async update({params: {id}, body, file}, res) {
    // console.log("update -> req ", req)
    // console.log("update -> id ", id)
    // console.log("update -> body ", body)
    // console.log("update -> model ", model.schema)
    if(file){
      const oldItem = await model.findById('5fe0a82125002640a08f7365')
      fs.unlink(oldItem.imageUrl.path, function(err) {
        if (err) throw err;
        console.log('file deleted');
      });
    }

    try {
      const item = await model.findByIdAndUpdate(
        {_id: '5fe0a82125002640a08f7365'}, 
        file ? {...body, imageUrl: file} : body,
        { 
          new: true,
          upsert: true
        }
      )
      return res.send({item})
    } catch(error) {
      res.status(400).json(Boom.boomify(error))
    }
  },
  async delete({params: {id}}, res) {
    try {
      await model.findByIdAndDelete(id)
      return res.send({status: 'OK', message: 'Delete item'})
    } catch(error) {
      res.status(400).send(Boom.boomify(error))
    }
  }
})

module.exports = genericCrud