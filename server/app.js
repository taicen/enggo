const express = require('express')
const bodyParser = require('body-parser')
const config = require('config')
const cors = require('cors');
const mongoose = require('mongoose')
const https = require('https');
const http = require('http');
const { routes } = require("./routes");

const fs = require('fs');
const path = require("path");

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/", express.static("dist"));
app.use("/", express.static("static"));

app.get("/", (req, res) => {
  // res.set({ 'Content-Security-Policy': 'frame-ancestors https://77.223.96.62 http://77.223.96.62 https://www.linkchat.io https://linkchat.io https://www.online.enggo.kz/ https://online.enggo.kz/' })
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 404 PAGE ===================
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../dist', '200.html'));
});

routes.forEach(route => {
  app.use(`/api/v1/${route}`, require(`./routes/${route}`))
});

const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, 'sslcert', 'key.pem')), // путь к ключу
  cert: fs.readFileSync(path.join(__dirname, 'sslcert', 'cert.pem')) // путь к сертификату
}

const PORT = config.get('port') || 5000

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })

    http.createServer(function (req, res) {
      res.writeHead(301, { "Location": "https://" + req.headers['host'].replace(PORT, 443) + req.url });
      console.log("http request, will go to >> ");
      console.log("https://" + req.headers['host'].replace(PORT, 443) + req.url);
      res.end();
    }).listen(PORT);

    https.createServer(httpsOptions, app).listen(443, () => console.log(`App has been started on port 443...`));

    // app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    // https.createServer(httpsOptions, app).listen(3443, () => console.log(`App has been started on port 3443...`));
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start();
