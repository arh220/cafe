const cloudinary = require("cloudinary").v2;
async function cloudinaryConfig() {
  await cloudinary.config({
    cloud_name: "dobvvwnji",
    api_key: "483672756843375",
    api_secret: "TlQqKft3q-WnBD5PaKwayqoNjhQ"
  });
  console.log("cloudinary configration succssess...");
}
module.exports = { cloudinaryConfig };
