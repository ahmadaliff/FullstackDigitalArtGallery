const { where } = require("sequelize");
const {
  handleResponse,
  handleNotFound,
} = require("../helpers/handleResponseHelper");
const { Art, Favorit } = require("../models");

exports.authorizationIsOwnArt = async (req, res, next) => {
  const { id, role } = req;
  const { artId } = req.params;
  const dataArt = await Art.findByPk(artId);

  if (!dataArt) {
    return handleNotFound(res);
  }
  if (dataArt.userId === id || role === "admin") {
    next();
  } else {
    return handleResponse(res, 403, {
      message: "you dont have access to this art",
    });
  }
};

exports.authorizationIsOwnFavorit = async (req, res, next) => {
  const { id, role } = req;
  const { artId } = req.params;
  const dataFavorit = await Favorit.findAll({
    where: { artId: artId, userId: id },
  });
  if (!dataFavorit) {
    return handleNotFound(res);
  }
  if (dataFavorit.userId === id || role === "admin") {
    next();
  } else {
    return handleResponse(res, 403, {
      message: "you dont have access to this favorit",
    });
  }
};
