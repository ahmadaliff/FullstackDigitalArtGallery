const { handleResponse } = require("../helpers/handleResponseHelper");

exports.authorizationRoleAdmin = async (req, res, next) => {
  const { role } = req;
  if (role != "admin") {
    return handleResponse(res, 403, {
      message: "unauthorize, forbidden access this endpoint ",
    });
  }
  next();
};

exports.authorizationRoleArtist = async (req, res, next) => {
  const { role } = req;
  if (role != "artist") {
    return handleResponse(res, 403, {
      message: "unauthorize, forbidden access this endpoint ",
    });
  }
  next();
};
