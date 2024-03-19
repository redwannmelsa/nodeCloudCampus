'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: DataTypes.STRING,
        notNull: true,
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
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};