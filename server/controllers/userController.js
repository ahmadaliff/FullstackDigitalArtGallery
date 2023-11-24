const {
  handleServerError,
  handleSuccess,
  handleResponse,
  handleNotFound,
} = require("../helpers/handleResponseHelper");
const cookie = require("cookie-parser");
const { validateJoi, schemaUser } = require("../helpers/joiHelper");
const {
  handleSendMailForgotPass,
  handleSendMailVerifyOTP,
} = require("../helpers/sendMailHelper");

const { comparePassword, hashPassword } = require("../utils/bcryptUtil");
const {
  createToken,
  createTokenForForgetPassword,
  createTokenVerifyEmail,
  createRefreshToken,
} = require("../utils/jwtUtil");

const { User, Art, sequelize } = require("../models");

exports.login = async (req, res) => {
  // #swagger.tags = ['GlobalRoute']
  try {
    const { email, password } = req.body;
    const { error, handleRes } = validateJoi(
      res,
      { email, password },
      schemaUser,
      ["email", "password"]
    );
    if (error) {
      return handleRes;
    }
    const dataUser = await User.findOne({
      where: { email: email },
    });

    if (!dataUser || !comparePassword(password, dataUser?.password)) {
      return handleResponse(res, 400, { message: "invalid email or password" });
    }
    const token = createToken(dataUser);
    const refreshToken = createRefreshToken(dataUser);
    if (!token || !refreshToken) {
      throw new Error("Token Created failed");
    }
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return handleSuccess(res, {
      token: token,
      message: "Login success",
    });
  } catch (error) {
    return handleServerError(res);
  }
};

exports.register = async (req, res) => {
  // #swagger.tags = ['GlobalRoute']
  try {
    const newUser = req.body;
    const roleList = ["artist", "admin"];
    const { error, handleRes } = validateJoi(res, newUser, schemaUser);
    if (error) {
      return handleRes;
    }
    if (newUser.role && !roleList.includes(newUser.role)) {
      return handleResponse(res, 400, "Invalid role");
    }
    const isExist = await User.findOne({ where: { email: newUser.email } });
    if (isExist) {
      return handleResponse(res, 409, {
        message: "user with that email already existed",
      });
    }
    const response = await User.create(newUser);
    return handleSuccess(res, {
      data: response,
      message: `success register as: ${response.role}`,
    });
  } catch (error) {
    return handleServerError(res);
  }
};

exports.forgotPassword = async (req, res) => {
  // #swagger.tags = ['GlobalRoute']
  try {
    const { email } = req.body;
    const isUserExist = await User.findOne({ where: { email: email } });
    if (!isUserExist) {
      return handleNotFound(res);
    }
    const token = createTokenForForgetPassword(email);
    const resp = await handleSendMailForgotPass(token, email);
    if (resp.accepted.length > 0) {
      return handleSuccess(res, {
        message: "Check your email for forgot password",
      });
    } else {
      return handleSuccess(res, {
        message: "Email for forgot password failed to sent",
      });
    }
  } catch (error) {
    return handleServerError(res);
  }
};

exports.setResetPassword = async (req, res) => {
  // #swagger.tags = ['GlobalRoute']
  try {
    const { email } = req;
    const { new_password } = req.body;
    const isUserExist = await User.findOne({ where: { email: email } });
    if (!isUserExist) {
      return handleNotFound(res);
    }
    await User.update(
      { password: hashPassword(new_password) },
      { where: { email: email } }
    );
    return handleSuccess(res, {
      message: "Success reset password",
    });
  } catch (error) {
    return handleServerError(res);
  }
};

exports.editProfile = async (req, res) => {
  // #swagger.tags = ['GlobalRoute']
  /* #swagger.parameters['authorization'] ={
        "in": "header",
        "schema": {
          "type": "string"
        }
      }
  */
  try {
    const { id, role } = req;
    const newUser = req.body;
    const fieldtoEdit = Object.keys(newUser);
    const { error, handleRes } = validateJoi(
      res,
      newUser,
      schemaUser,
      fieldtoEdit
    );
    const isExist = await User.findOne({ where: { id: id } });
    if (!isExist) {
      return handleNotFound(res);
    }
    if (fieldtoEdit.includes("email") && newUser.email != isExist.email) {
      newUser.isVerify = false;
    }
    if (error) {
      return handleRes;
    }
    if (
      fieldtoEdit.includes("role") &&
      newUser.role != isExist.role &&
      role != "admin"
    ) {
      return handleResponse(res, 403, {
        message: "you dont have access to change role",
      });
    }
    const result = await sequelize.transaction(async (tsc) => {
      if (newUser.role && role === "admin" && isExist.role !== newUser.role) {
        if (newUser.role === "admin") {
          const isExistinArt = await Art.findOne({
            where: { userId: isExist.id },
          });
          if (isExistinArt) {
            await Art.destroy({
              where: { userId: isExist.id },
              transaction: tsc,
            });
          }
        }
      }
      const response = await isExist.update(newUser);
      return response;
    });
    return handleSuccess(res, {
      data: result,
      message: "success edit profile",
    });
  } catch (error) {
    return handleServerError(res);
  }
};

exports.getProfile = async (req, res) => {
  // #swagger.tags = ['GlobalRoute']
  /* #swagger.parameters['authorization'] ={
        "in": "header",
        "schema": {
          "type": "string"
        }
      }
  */
  try {
    const { id } = req;
    const response = await User.findByPk(id);
    if (!response) {
      return handleNotFound(res);
    }
    return handleSuccess(res, { data: response, message: "success" });
  } catch (error) {
    return handleServerError(res);
  }
};

exports.verifyEmail = async (req, res) => {
  // #swagger.tags = ['GlobalRoute']
  /* #swagger.parameters['authorization'] ={
        "in": "header",
        "schema": {
          "type": "string"
        }
      }
  */
  try {
    const { id } = req;
    const { email } = req.body;
    const dataUser = await User.findOne({ where: { id: id, email: email } });
    if (!dataUser) {
      return handleNotFound(res);
    }
    const OTP = Math.floor(Math.random() * 9000 + 1000);
    const status = handleSendMailVerifyOTP(OTP, email);
    if (status) {
      return handleSuccess(res, {
        data: createTokenVerifyEmail(OTP, email),
        message: "OTP sent to email",
      });
    }
    return handleSuccess(res, {
      message: "Email for OTP verify failed to sent",
    });
  } catch (error) {
    return handleServerError(res);
  }
};

exports.setVerifyEmail = async (req, res) => {
  // #swagger.tags = ['GlobalRoute']
  /* #swagger.parameters['authorization'] ={
        "in": "header",
        "schema": {
          "type": "string"
        }
      }
  */
  try {
    const { otp } = req.body;
    const { otpJWT, email, id } = req;
    const dataUser = await User.findOne({ where: { id: id, email: email } });
    if (!dataUser) {
      return handleNotFound(res);
    }
    if (otp != otpJWT) {
      return handleResponse(res, 404, { message: "OTP Invalid" });
    }
    await User.update({ isVerify: true }, { where: { id: id } });
    return handleSuccess(res, { message: "success verify" });
  } catch (error) {
    return handleServerError(res);
  }
};
