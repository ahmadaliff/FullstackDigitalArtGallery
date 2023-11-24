const { verifyTokenVerifyEmail } = require("../utils/jwtUtil");

exports.verifyEmailMiddleware = async (req, res, next) => {
  const { tokenOtp } = req.body;
  if (!tokenOtp) return res.sendStatus(403);
  const { email, otp } = verifyTokenVerifyEmail(tokenOtp);
  req.email = email;
  req.otpJWT = otp;
  next();
};
