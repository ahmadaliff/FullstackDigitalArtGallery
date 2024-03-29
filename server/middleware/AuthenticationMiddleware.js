const { verifyToken } = require("../utils/jwtUtil");
const { User } = require("../models");

exports.authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.replace("Bearer ", "");

  const { id, role, error } = verifyToken(token);
  if (error) {
    return res.sendStatus(401);
  }
  const isExist = await User.findOne({ where: { id: id } });
  if (!isExist || isExist.role != role) {
    return res.sendStatus(401);
  }
  req.id = id;
  req.role = role;
  next();
};
