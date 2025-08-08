const Comment = require("../models/comment");

function everypageinuser(req, res, next) {
  res.locals.user = req.user;
  next();
}
async function allcomentsInEveryPage(req, res, next) {
  const coment = await Comment.find();
  res.locals.allcoments = coment;
  next();
}

module.exports = { everypageinuser, allcomentsInEveryPage };
