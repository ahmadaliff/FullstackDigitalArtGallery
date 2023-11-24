const { createToken, verifyRefreshToken } = require("../utils/jwtUtil.js");

const {
  handleNotFound,
  handleServerError,
  handleSuccess,
  handleResponse,
} = require("../helpers/handleResponseHelper.js");

const { User } = require("../models");

exports.RefreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(403);
    const { id, role, errorJWT } = verifyRefreshToken(refreshToken);
    if (errorJWT) {
      return handleResponse(res, 406, { message: "Refresh Token Expired" });
    }
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
