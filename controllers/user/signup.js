const User = require("../../models/user");
const bcrypt = require("bcrypt");
const uploadImage = require("../../utils/uploadimage");
const fs = require("fs");
const sendMail = require("../../utils/nodemailer");

async function signupUser(req, res) {
  const { name, email, pass, mo, city, dob, gender } = req.body;
  const image = req.file;
  //   console.log(req.file);
  //   console.log(req.body);
  const { secure_url, public_id } = await uploadImage(image.path);
  fs.unlinkSync(image.path);
  const hashpass = await bcrypt.hash(pass, 10);
  await User.create({
    name,
    email,
    pass: hashpass,
    mo,
    city,
    dob,
    gender,
    image: secure_url,
    imageId: public_id
  });
  await sendMail(email, "welcome to oure website", `Hi, ${name} Thank you for registring! `);

  res.redirect("/signin");
}
module.exports = { signupUser };
