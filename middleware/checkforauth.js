const User = require("../models/user");
const { validateToken } = require("./auth");

function checkForAuthCookie(cookieName) {
  return async (req, res, next) => {
    const token = req.cookies[cookieName];
    if (!token) return next();

    try {
      const decoded = validateToken(token);
      const user = await User.findById(decoded._id);
      if (user) {
        req.user = user;
        res.locals.user = user; // you already set this
      }
    } catch (err) {
      console.error("JWT Error:", err.message);
    }

    next();
  };
}

function requiredAuth(req, res, next) {
  if (!req.user) {
    return res.render("signin", { error: "You Must be Logged in" });
  }
  next();
}

module.exports = { checkForAuthCookie, requiredAuth };
