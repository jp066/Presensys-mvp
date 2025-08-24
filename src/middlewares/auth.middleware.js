const passport = require("passport");

function authMiddleware(req, res, next) {
  let responseObj = {
    statusCode: 0,
    message: "",
    data: {},
  };
  // Log do token recebido
  const authHeader = req.headers["authorization"];
  console.log("Authorization header:", authHeader);
  passport.authenticate("jwt", (err, user, info) => {
    if (err) {
      console.error("Erro no passport.authenticate:", err);
      return next(err);
    }
    if (!user) {
      console.warn("Usuário não autenticado. Info:", info);
      responseObj.data = info && info.message ? info.message : "Token inválido";
      responseObj.statusCode = 401;
      responseObj.message = "O usuario não está autorizado";
      return res.status(responseObj.statusCode).json(responseObj);
    } else {
      console.log("Usuário autenticado:", user);
      req.user = user;
      return next();
    }
  })(req, res, next);
}

module.exports = { authMiddleware };