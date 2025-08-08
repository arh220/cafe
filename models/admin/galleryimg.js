const mongoose = require("mongoose");
const galleryImageSchema = mongoose.Schema(
  {
    image: { type: String, required: true },
    imageId: { type: String, required: true }
  },
  { timestamps: true }
);
const galleryImage = mongoose.model("galleryimage", galleryImageSchema);
module.exports = galleryImage;
