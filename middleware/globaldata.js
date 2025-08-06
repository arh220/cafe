async function everypageinuser(req, res, next) {
  res.locals.signinuser = req.user;
  next();
}
async function everypageinAdminuser(req, res, next) {
  res.locals.adminuser = req.user;
  next();
}
module.exports = { everypageinuser, everypageinAdminuser };
