'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Woods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: 'name cannot be null'
          }
        }
      },
      type: {
        type: DataTypes.ENUM,
        values: ["softwood", "exotic wood", "noble and hardwoods"],
        validate: {
          notNull: {
            msg: 'type cannot be null'
          }
        }
      },
      hardness: {
        type: DataTypes.ENUM,
        values: ["tender", "medium-hard", "hard"],
        validate: {
          notNull: {
            msg: 'hardness cannot be null'
          }
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Woods');
  }
};