const gallaryImage = require("../../models/admin/galleryimg");

async function getImageIngallery(req, res) {
  const allimages = await gallaryImage.find();
  res.render("gallery", { allimages });
}
module.exports = getImageIngallery;
