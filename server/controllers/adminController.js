const {
  handleNotFound,
  handleSuccess,
  handleResponse,
  handleServerError,
} = require("../helpers/handleResponseHelper");

const { User, Art, Category, sequelize } = require("../models");

exports.getAllArt = async (req, res) => {
  // #swagger.tags = ['adminRoute']
  /* #swagger.parameters['authorization'] ={
        "in": "header",
        "schema": {
          "type": "string"
        }
      }
  */
  try {
    const response = await Art.findAll({ where: { isAcc: false } });
    return handleSuccess(res, { data: response, message: "success" });
  } catch (error) {
    return handleServerError(res);
  }
};
// get user
exports.getAllUser = async (req, res) => {
  // #swagger.tags = ['adminRoute']
  /* #swagger.parameters['authorization'] ={
        "in": "header",
        "schema": {
          "type": "string"
        }
      }
  */
  try {
    const response = await User.findAll();
    if (!response) {
      return handleNotFound(res);
    }
    return handleSuccess(res, { data: response, message: "success" });
  } catch (error) {
    return handleServerError(res);
  }
};
// acc art
exports.accArt = async (req, res) => {
  // #swagger.tags = ['adminRoute']
  /* #swagger.parameters['authorization'] ={
        "in": "header",
        "schema": {
          "type": "string"
        }
      }
  */
  try {
    const { artId } = req.params;
    const isExist = await Art.findByPk(artId);
    if (!isExist) {
      return handleNotFound(res);
    }
    if (isExist.isAcc) {
      return handleResponse(res, 409, { message: "Art already Acc by admin" });
    }
    await Art.update({ isAcc: true }, { where: { id: artId } });
    return handleSuccess(res, { message: "success" });
  } catch (error) {
    return handleServerError(res);
  }
};
//refuse Art
exports.refuseArt = async (req, res) => {
  // #swagger.tags = ['adminRoute']
  /* #swagger.parameters['authorization'] ={
        "in": "header",
        "schema": {
          "type": "string"
        }
      }
  */
  try {
    const { artId } = req.params;
    const isExist = await Art.findByPk(artId);
    if (!isExist) {
      return handleNotFound(res);
    }
    if (!isExist.isAcc) {
      return handleResponse(res, 409, {
        message: "Art already not acc by admin",
      });
    }
    await Art.update({ isAcc: false }, { where: { id: artId } });
    return handleSuccess(res, { message: "success" });
  } catch (error) {
    return handleServerError(res);
  }
};
// delete category
exports.deleteCategory = async (req, res) => {
  // #swagger.tags = ['adminRoute']
  /* #swagger.parameters['authorization'] ={
        "in": "header",
        "schema": {
          "type": "string"
        }
      }
  */
  try {
    const { categoryId } = req.params;
    const isExist = await Category.findByPk(categoryId);
    if (!isExist) {
      return handleNotFound(res);
    }
    await sequelize.transaction(async (tsc) => {
      const isExistinArt = await Art.findOne({
        where: { categoryId: categoryId },
      });
      if (isExistinArt) {
        await Art.destroy({
          where: { categoryId: categoryId },
          transaction: tsc,
        });
      }

      await Category.destroy({ where: { id: categoryId } });
    });
    return handleSuccess(res, { message: "deleted category" });
  } catch (error) {
    return handleServerError(res);
  }
};
//delete user
exports.deleteUser = async (req, res) => {
  // #swagger.tags = ['adminRoute']
  /* #swagger.parameters['authorization'] ={
        "in": "header",
        "schema": {
          "type": "string"
        }
      }
  */
  try {
    const { userId } = req.params;
    const dataUser = await User.findByPk(userId);
    if (!dataUser) {
      return handleNotFound(res);
    }
    await sequelize.transaction(async (tsc) => {
      if (dataUser.role === "artist") {
        const isExistinArt = await Art.findOne({
          where: { userId: dataUser.id },
        });
        if (isExistinArt) {
          await Art.destroy({
            where: { userId: dataUser.id },
            transaction: tsc,
          });
        }
      }
      await User.destroy({ where: { id: dataUser.id } });
    });
    return handleSuccess(res, { message: "deleted account" });
  } catch (error) {
    return handleServerError(res);
  }
};
//change role, only admin can change
exports.changeRole = async (req, res) => {
  // #swagger.tags = ['adminRoute']
  /* #swagger.parameters['authorization'] ={
        "in": "header",
        "schema": {
          "type": "string"
        }
      }
  */
  try {
    const { userId } = req.params;
    const isExist = await User.findByPk(userId);
    if (!isExist) {
      return handleNotFound(res);
    }
    const response = await User.update(
      { role: isExist.role === "admin" ? "artist" : "admin" },
      { where: { id: userId } }
    );
    isExist.role = isExist.role === "admin" ? "artist" : "admin";
    return handleSuccess(res, {
      data: isExist,
      message: "success",
    });
  } catch (error) {
    return handleServerError(res);
  }
};
