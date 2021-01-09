const path = require('path')
const multer = require('multer')
const moment = require('moment')

const storage = multer.diskStorage({
  destination(req, file, cb){
    // console.log("destination -> file ", file)
    cb(null, path.resolve(__dirname, '../..', 'assets/images'))
  },
  filename(req, file, cb){
    // console.log("filename -> file ", file)
    cb(null, `${moment().format('DDMMYYYY-HHmmss_SSS')}-${file.originalname}`)
  }
})
const fileFilter = (req, file, cb) => {
  // console.log("fileFilter -> file ", file)
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
    cb(null, true)
  } else {
    cb(null, false)
  }
}

module.exports = multer({
  storage,
  fileFilter,
  limits: {fileSize: 1024 * 1024 * 5}
})