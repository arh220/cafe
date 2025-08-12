const { createTokenForUser } = require("../../middleware/auth");
const User = require("../../models/user");
const bcrypt = require("bcrypt");

async function signinUser(req, res) {
  const { email, pass } = req.body;
  const signinUser = await User.findOne({ email });
  //   console.log(signinUser);
  if (!signinUser) {
    return res.render("signup", { error: "Email Note Register..." });
  }
  const ismatch = await bcrypt.compare(pass, signinUser.pass);
  if (!ismatch) {
    return res.render("signin", { error: "Incorrect Password..." });
  }
  const token = createTokenForUser(signinUser);
  return res.cookie("usertoken", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24, sameSite: "lax" }).redirect("/");
}
module.exports = signinUser;
