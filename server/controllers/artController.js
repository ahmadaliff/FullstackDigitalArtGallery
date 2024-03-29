const { unlink } = require("fs");
const {
  handleNotFound,
  handleSuccess,
  handleServerError,
  handleResponse,
} = require("../helpers/handleResponseHelper");
const { validateJoi, schemaFavorit } = require("../helpers/joiHelper");
const { User, Art, Favorit, Category, sequelize } = require("../models");

exports.getAllArt = async (req, res) => {
  // #swagger.tags = ['GlobalRoute']
  try {
    const response = await Art.findAll({ where: { isAcc: true } });
    return handleSuccess(res, { data: response, message: "success" });
  } catch (error) {
    return handleServerError(res);
  }
};

exports.getDetailArt = async (req, res) => {
  // #swagger.tags = ['GlobalRoute']
  try {
    const { artId } = req.params;
    const response = await Art.findByPk(artId, { include: { model: User } });
    if (!response) {
      return handleNotFound(res);
    }
    return handleSuccess(res, { data: response, message: "success" });
  } catch (error) {
    return handleServerError(res);
  }
};
exports.getCategory = async (req, res) => {
  // #swagger.tags = ['GlobalRoute']
  try {
    const response = await Category.findAll();
    if (!response) {
      return handleNotFound(res);
    }
    return handleSuccess(res, { data: response, message: "success" });
  } catch (error) {
    return handleServerError(res);
  }
};

// use middleware check own Favorit
exports.addArtToFavorit = async (req, res) => {
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
    const { artId } = req.params;
    const artExist = await Art.findByPk(artId);
    if (!artExist) {
      return handleNotFound(res);
    }
    const isAlreadyExist = await Favorit.findOne({
      where: { userId: id, artId: artId },
    });
    if (isAlreadyExist) {
      return handleResponse(res, 409, { message: "art already in favorite" });
    }
    const newData = { userId: id, artId: artId };
    const { error, handleRes } = validateJoi(res, newData, schemaFavorit);
    if (error) {
      return handleRes;
    }
    const response = await Favorit.create(newData);
    return handleSuccess(res, { data: response, message: "success" });
  } catch (error) {
    return handleServerError(res);
  }
};

// use middleware check own Favorit
exports.deleteArtFromFavorit = async (req, res) => {
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
    const { artId } = req.params;
    const isExist = await Favorit.findOne({
      where: { userId: id, artId: artId },
    });
    if (!isExist) {
      return handleNotFound(res);
    }
    await Favorit.destroy({ where: { id: isExist.id } });
    return handleSuccess(res, { message: "success" });
  } catch (error) {
    return handleServerError(res);
  }
};

// use middleware check own Art
exports.deleteArt = async (req, res) => {
  // #swagger.tags = ['GlobalRoute']
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
    unlink(isExist.imagePath, (err) => {});

    await sequelize.transaction(async (tsc) => {
      const isExistinFav = await Favorit.findOne({
        where: { artId: artId },
      });
      if (isExistinFav) {
        await Favorit.destroy({
          where: { artId: artId },
          transaction: tsc,
        });
      }
      await Art.destroy({ where: { id: artId }, transaction: tsc });
    });
    return handleSuccess(res, { message: "deleted" });
  } catch (error) {
    return handleServerError(res);
  }
};

exports.getFavorit = async (req, res) => {
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
    const response = await Favorit.findAll({ where: { userId: id } });
    if (!response) {
      return handleNotFound(res);
    }
    return handleSuccess(res, { data: response, message: "success" });
  } catch (error) {
    return handleServerError(res);
  }
};
