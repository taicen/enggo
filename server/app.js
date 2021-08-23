const express = require('express')
const bodyParser = require('body-parser')
const config = require('config')
const cors = require('cors');
const mongoose = require('mongoose')
const { routes } = require("./routes");

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

routes.forEach(route => {
  app.use(`/api/v1/${route}`, require(`./routes/${route}`))
});

const PORT = config.get('port') || 5000

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start();
