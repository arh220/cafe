const galleryImage = require("../../models/admin/galleryimg");
const { uploadImage, deleteImageFromCloudinary } = require("../../utils/uploadimage");
const fs = require("fs");

async function addGalleryImage(req, res) {
  const image = req.file;
  const { secure_url, public_id } = await uploadImage(image.path);
  fs.unlinkSync(image.path);
  await galleryImage.create({ image: secure_url, imageId: public_id });
  res.redirect("/admin/addgalleryimg");
}
async function allGalleryImage(req, res) {
  const allGalleryImages = await galleryImage.find();
  res.render("admin/allgalleryimg", { allGalleryImages });
}
async function deleteGalleryImage(req, res) {
  const imageid = await galleryImage.findById(req.params.id);
  await deleteImageFromCloudinary(imageid.imageId);
  await galleryImage.findByIdAndDelete(req.params.id);
  return allGalleryImage(req, res);
}
module.exports = { addGalleryImage, allGalleryImage, deleteGalleryImage };
