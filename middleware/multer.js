const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null, `public/images/allimages`);
  },
  filename: function(req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const uploads = multer({ storage });
module.exports = uploads;
