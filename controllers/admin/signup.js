const { error } = require("console");
const User = require("../../models/user");
const uploadImage = require("../../utils/uploadimage");
const fs = require("fs");
const { createTokenForUser } = require("../../middleware/auth");
const bcrypt = require("bcrypt");

async function signUpAdminUser(req, res) {
  const { name, email, pass, mo, city, gender, role, dob } = req.body;
  const image = req.file;
  const hashpass = await bcrypt.hash(pass, 10);
  const { secure_url, public_id } = await uploadImage(image.path);
  fs.unlinkSync(image.path);
  // console.log(hashpass);
  const adminuser = await User.create({
    name,
    email,
    pass: hashpass,
    mo,
    city,
    dob,
    image: secure_url,
    imageId: public_id,
    gender,
    role
  });
  res.render("admin/home", { error: null });
}
async function signinAdminUser(req, res) {
  try {
    const { email, pass } = req.body;
    if (!email || !pass) {
      return res.render("admin/signin", { error: "Please enter email and password" });
    }

    const adminuser = await User.findOne({ email, role: "ADMIN" });
    if (!adminuser) {
      return res.render("admin/signin", { error: "You Are Not Authorized..." });
    }

    const ismatch = await bcrypt.compare(pass, adminuser.pass);
    if (!ismatch) {
      return res.render("admin/signin", { error: "Email or password not match..." });
    }

    const token = createTokenForUser(adminuser);
    res.cookie("admintoken", token, { httpOnly: true }).redirect("/admin/home");
  } catch (err) {
    console.error(err);
    return res.status(500).render("admin/signin", { error: "Something went wrong." });
  }
}
async function signupUserList(req, res) {
  const allSignUpUsers = await User.find({ role: "USER" });
  res.render("admin/signupuserlist", { allSignUpUsers });
}
async function signUpAdminUserList(req, res) {
  const allSignUpAdminUsers = await User.find({ role: "ADMIN" });
  res.render("admin/signupadminuserlist", { allSignUpAdminUsers });
}

module.exports = { signUpAdminUser, signinAdminUser, signupUserList, signUpAdminUserList };
