const { createToken, verifyRefreshToken } = require("../utils/jwtUtil.js");

const {
  handleNotFound,
  handleServerError,
  handleSuccess,
} = require("../helpers/handleResponseHelper.js");

const { User } = require("../models");

exports.RefreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) res.sendStatus(403);
    const { id, role } = verifyRefreshToken(refreshToken);
    const dataUser = await User.findOne({ where: { id: id, role: role } });
    if (!dataUser) {
      return handleNotFound(res);
    }
    const token = createToken(dataUser);
    return handleSuccess(res, { token: token });
  } catch (error) {
    return handleServerError(res);
  }
};
