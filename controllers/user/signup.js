const User = require("../../models/user");
const bcrypt = require("bcrypt");

async function signupUser(req, res) {
  const { name, email, pass, mo, city, dob, gender } = req.body;
  //   console.log(req.body);
  const hashpass = await bcrypt.hash(pass, 10);
  //   console.log(req.file);
  await User.create({
    name,
    email,
    pass: hashpass,
    mo,
    city,
    dob,
    gender,
    image: `/images/signinuserprofile/${req.file?.filename || "default.png"}`
  });
  res.render("signin");
}
module.exports = { signupUser };
