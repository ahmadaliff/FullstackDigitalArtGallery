const { verifyTokenForForgetPassword } = require("../utils/jwtUtil");

exports.verifySendResetMiddleware = async (req, res, next) => {
  const { token } = req.body;
  if (!token) return res.sendStatus(401);
  const { email } = verifyTokenForForgetPassword(token);
  req.email = email;
  next();
};
