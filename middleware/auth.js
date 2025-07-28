const jwt = require("jsonwebtoken");

secretkey = "@arh123+";
function createTokenForUser(signinuser) {
  const payload = {
    _id: signinuser._id,
    email: signinuser.email,
    image: signinuser.image,
    role: signinuser.role
  };
  const token = jwt.sign(payload, secretkey);
  return token;
}
function validateToken(token) {
  const payload = jwt.verify(token, secretkey);
  return payload;
}
module.exports = { createTokenForUser, validateToken };
