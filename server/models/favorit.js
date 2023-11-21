"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Favorit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favorit.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Favorit.belongsTo(models.Art, {
        foreignKey: "artId",
      });
    }
  }
  Favorit.init(
    {
      artId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Favorit",
    }
  );
  return Favorit;
};
