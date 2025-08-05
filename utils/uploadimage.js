const cloudinary = require("cloudinary").v2;

async function uploadImage(imagepath) {
  const result = await cloudinary.uploader.upload(imagepath, {
    folder: "cafe"
  });
  return result;
}
async function deleteImageFromCloudinary(imageId) {
  await cloudinary.uploader.destroy(imageId);
}
(module.exports = uploadImage), deleteImageFromCloudinary;
