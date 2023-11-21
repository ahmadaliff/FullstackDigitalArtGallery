"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Art extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Art.hasMany(models.Favorit, {
        foreignKey: "artId",
      });
      Art.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Art.belongsTo(models.Category, {
        foreignKey: "categoryId",
      });
    }
  }
  Art.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      imagePath: DataTypes.STRING,
      isAcc: DataTypes.BOOLEAN,
      categoryId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      hooks: {
        beforeCreate: (art) => {
          if (!art.isAcc) {
            art.isAcc = false;
          }
        },
      },
      sequelize,
      modelName: "Art",
    }
  );
  return Art;
};
