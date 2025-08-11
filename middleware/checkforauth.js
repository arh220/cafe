const User = require("../models/user");
const { validateToken } = require("./auth");

function checkForAuthCookie(cookieName, roleRequired) {
  return async (req, res, next) => {
    const token = req.cookies[cookieName];
    if (!token) return next();

    try {
      const decoded = validateToken(token);
      // compare roles case-insensitive
      if (decoded.role.toLowerCase() !== roleRequired.toLowerCase()) return next();

      const user = await User.findById(decoded._id);
      if (user) {
        // Assign based on lowercase role
        if (user.role.toLowerCase() === "user") {
          req.user = user;
          res.locals.user = user;
        } else if (user.role.toLowerCase() === "admin") {
          req.admin = user;
          res.locals.admin = user;
        }
      }
    } catch (err) {
      console.error("JWT error:", err.message);
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
