const passport = require("passport");

function authMiddleware(req, res, next) {
  let responseObj = {
    statusCode: 0,
    message: "",
    data: {},
  };
  passport.authenticate("jwt", (err, user, info) => {
    if (err) {
      return next();
    }
    if (!user) {
      responseObj.data = info.message;
      responseObj.statusCode = 401;
      responseObj.message = "O usuario não está autorizado";
      return res.status(responseObj.statusCode).json(responseObj);
    } else {
      req.user = user;
    }
    next();
  });
}

module.exports = { authMiddleware };