'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'first name cannot be null'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'last name cannot be null'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          msg: 'invalid email'
        },
        notNull: {
          msg: 'email cannot be null'
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'password cannot be null'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true
  });
  return User;
};