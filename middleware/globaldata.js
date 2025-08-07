async function everypageinuser(req, res, next) {
  res.locals.signinuser = req.user;
  next();
}

module.exports = { everypageinuser,  };
