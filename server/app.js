const express = require('express')
const bodyParser = require('body-parser')
const config = require('config')
const cors = require('cors');
const mongoose = require('mongoose')
const https = require('https');
const fs = require('fs');
const path = require("path");
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
    const httpsOptions = {
      key: fs.readFileSync(path.join(__dirname, 'sslcert', 'private.rtf')), // путь к ключу
      cert: fs.readFileSync(path.join(__dirname, 'sslcert', 'certificate.rtf')) // путь к сертификату
    }
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    https.createServer(httpsOptions, app).listen(3443, () => console.log(`App has been started on port 3443...`));
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start();
