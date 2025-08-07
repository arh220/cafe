const jwt = require("jsonwebtoken");
const User = require("../models/user");

const JWT_SECRET = process.env.JWT_SECRET;

async function setAdminUser(req, res, next) {
  try {
    const token = req.cookies.token;
    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded._id);
      if (user && user.role === "ADMIN") {
        res.locals.adminuser = user;
      } else {
        res.locals.adminuser = null;
      }
    } else {
      res.locals.adminuser = null;
    }
  } catch (err) {
    res.locals.adminuser = null;
  }
  next();
}

module.exports = setAdminUser;
