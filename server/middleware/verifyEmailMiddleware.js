const { verifyTokenVerifyEmail } = require("../utils/jwtUtil");

exports.verifyEmailMiddleware = async (req, res, next) => {
  const token = req.params;
  if (!token) return res.sendStatus(401);
  const { email, otp } = verifyTokenVerifyEmail(token);
  req.email = email;
  req.otpJWT = otp;
  next();
};
