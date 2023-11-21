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
  if (dataArt.userId != id || role != "admin") {
    return handleResponse(res, 401, {
      message: "you dont have access to this art",
    });
  }
  next();
};

exports.authorizationIsOwnFavorit = async (req, res, next) => {
  const { id } = req;
  const { favoritId } = req.params;
  const dataFavorit = await Favorit.findByPk(favoritId);
  if (!dataFavorit) {
    return handleNotFound(res);
  }
  if (dataFavorit.userId != id || role != "admin") {
    return handleResponse(res, 401, {
      message: "you dont have access to this favorit",
    });
  }
  next();
};
