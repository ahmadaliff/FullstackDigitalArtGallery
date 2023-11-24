"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../utils/bcryptUtil");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Art, {
        foreignKey: "userId",
      });
      User.hasMany(models.Favorit, {
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      isVerify: DataTypes.BOOLEAN,
    },
    {
      hooks: {
        beforeCreate: (user) => {
          user.password = hashPassword(user.password);
          user.isVerify = false;
          if (!user.role) {
            user.role = "artist";
          }
        },
        beforeUpdate: (user) => {
          if (user.password) user.password = hashPassword(user.password);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
