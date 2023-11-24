const { unlink } = require("fs");
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
const { Art, Category } = require("../models");

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
    return handleCreated(res, {
      data: response,
      message: "success, Your Art need to acc by admin to show on homepage",
    });
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
    const imagePath = req?.file?.path;
    const newArt = req.body;
    const { artId } = req.params;
    const { id } = req;
    const isExist = await Art.findByPk(artId);

    if (!isExist) {
      return handleNotFound(res);
    }
    if (imagePath) {
      newArt.imagePath = imagePath;
      unlink(isExist.imagePath, (err) => {});
    }
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
    const isCategoryExist = await Category.findOne({
      where: {
        name: name,
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
    const response = await Category.create({ name: name });
    return handleCreated(res, { data: response, message: "success" });
  } catch (error) {
    return handleServerError(res);
  }
};
