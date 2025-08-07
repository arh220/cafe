const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
function createTokenForUser(signinuser) {
  const payload = {
    _id: signinuser._id,
    email: signinuser.email,
    image: signinuser.image,
    role: signinuser.role
  };
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
}
function validateToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid Token");
  }
}

module.exports = { createTokenForUser, validateToken };
