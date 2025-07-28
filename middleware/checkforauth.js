const { validateToken } = require("./auth");

function checkForAuthCookie(cookiename) {
  return (req, res, next) => {
    const tokencookievalue = req.cookies[cookiename];
    if (!tokencookievalue) {
      return next();
    }
    try {
      const userpayload = validateToken(tokencookievalue);
      req.user = userpayload;
    } catch (error) {}
    return next();
  };
}
function requiredAuth(req, res, next) {
  if (!req.user) {
    return res.render("signin", { error: "You Must be Logged in" });
  }
  next();
}

module.exports = { checkForAuthCookie, requiredAuth };
