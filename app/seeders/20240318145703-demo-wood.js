'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('woods', [
      {
        name: "Épicéa",
        type: "softwood",
        hardness: "tender",
        image: null
      },
      {
        name: "Pin",
        type: "softwood",
        hardness: "medium-hard",
        image: null
      },
      {
        name: "Padouk",
        type: "exotic wood",
        hardness: "hard",
        image: null
      },
      {
        name: "Érable",
        type: "noble and hardwoods",
        hardness: "medium-hard",
        image: null
      },
      {
        name: "Hêtre",
        type: "noble and hardwoods",
        hardness: "medium-hard",
        image: null
      },
      {
        name: "Itauba",
        type: "exotic wood",
        hardness: "hard",
        image: null
      },
      {
        name: "Douglas",
        type: "softwood",
        hardness: "tender",
        image: null
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('woods', null, {});
  }
};