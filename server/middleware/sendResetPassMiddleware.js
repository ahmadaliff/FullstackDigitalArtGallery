const { verifyTokenForForgetPassword } = require("../utils/jwtUtil");

exports.verifySendResetMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.replace("Bearer ", "");
  const { email } = verifyTokenForForgetPassword(token);
  req.email = email;
  next();
};
