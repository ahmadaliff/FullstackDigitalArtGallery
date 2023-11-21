const { Sequelize } = require("sequelize");
const {
  handleNotFound,
  handleServerError,
  handleCreated,
  handleResponse,
} = require("../helpers/handleResponseHelper");
const {
  validateJoi,
  schemaArt,
  schemaCategory,
} = require("../helpers/joiHelper");
const { Art } = require("../models");

// add art
exports.addArt = async (req, res) => {
  // #swagger.tags = ['artistRoute']
  /* #swagger.parameters['authorization'] ={
        "in": "header",
        "schema": {
          "type": "string"
        }
      }
  */
  try {
    const imagePath = req.file.path;
    const newArt = req.body;
    const { id } = req;
    newArt.imagePath = imagePath;
    newArt.userId = id;
    newArt.isAcc = false;
    const { error, handleRes } = validateJoi(res, newArt, schemaArt);
    if (error) {
      return handleRes;
    }
    const response = await Art.create(newArt);
    return handleCreated(res, { data: response, message: "success" });
  } catch (error) {
    return handleServerError(res);
  }
};
// update art
exports.updateArt = async (req, res) => {
  // #swagger.tags = ['artistRoute']
  /* #swagger.parameters['authorization'] ={
        "in": "header",
        "schema": {
          "type": "string"
        }
      }
  */
  try {
    const imagePath = req.file.path;
    const newArt = req.body;
    const { artId } = req.params;
    const { id } = req;
    newArt.imagePath = imagePath;
    newArt.userId = id;
    newArt.isAcc = false;
    const fieldToUpdate = Object.keys(newArt);
    const { error, handleRes } = validateJoi(
      res,
      newArt,
      schemaArt,
      fieldToUpdate
    );
    if (error) {
      return handleRes;
    }

    const isExist = await Art.findByPk(artId);
    if (!isExist) {
      return handleNotFound(res);
    }
    await Art.update(newArt, { where: { id: artId } });
    return handleCreated(res, { message: "success" });
  } catch (error) {
    return handleServerError(res);
  }
};
// add category art
exports.addCategory = async (req, res) => {
  // #swagger.tags = ['artistRoute']
  /* #swagger.parameters['authorization'] ={
        "in": "header",
        "schema": {
          "type": "string"
        }
      }
  */
  try {
    const { name } = req.body;
    // const
    const isCategoryExist = await Category.findOne({
      where: {
        [Sequelize.Op.iLike]: name,
      },
    });
    if (isCategoryExist) {
      return handleResponse(res, 409, {
        message: "Category with that name already exists",
      });
    }
    const { error, handleRes } = validateJoi(
      res,
      { name: name },
      schemaCategory
    );
    if (error) {
      return handleRes;
    }
    const response = await Category.create(name);
    return handleCreated(res, { data: response, message: "success" });
  } catch (error) {
    return handleServerError(res);
  }
};
