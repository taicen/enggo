const express = require("express");
// const https = require('https');
const helmet = require('helmet');
// const request = require("request");
// const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
// const cookie = require("simple-cookie");
// const createHtmlDom = require('htmldom');

// const fs = require('fs');
const path = require("path");

let app = express(),
  port = process.env.PORT || 5000;

// app.disable("x-powered-by");
// создаем парсер для данных application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))


app.use(helmet.hidePoweredBy());
// app.use(helmet.referrerPolicy({
//   policy: "no-referrer",
// }));

app.use(helmet.contentSecurityPolicy({
  useDefaults: true,
  directives: {
    frameAncestors: ["'self'", "https://77.223.96.62", "https://linkchat.io", "https://online.enggo.kz/"],
    // scriptSrc: ["'self'", "example.com"],
    // objectSrc: ["'none'"],
    // upgradeInsecureRequests: [],
  },
}));
// app.use(cookieParser());

app.use("/", express.static("dist"));
app.use("/", express.static("static"));

// app.use(function(req,resp,next){
//   if (req.protocol === 'http' && process.env.NODE_ENV === 'production') {
//       return resp.redirect(301, 'https://' + req.headers.host + '/');
//   } else {
//       return next();
//   }
// });

app.get("/", (req, res) => {
  // res.header('Content-Security-Policy', 'frame-ancestors https://77.223.96.62 http://77.223.96.62 https://www.linkchat.io https://linkchat.io https://www.online.enggo.kz/ https://online.enggo.kz/;')
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../dist', '200.html'));
});

app.listen(port, () => console.log(`App has been started on port ${port}...`));
