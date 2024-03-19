'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        firstname: null,
        lastname: 'Smith',
        email: 12,
        password: 'abcdef'
      },
      // {
      //   firstname: 'Bob',
      //   lastname: 'Johnson',
      //   email: 'bob.johnson@mail.com',
      //   password: 'qwerty'
      // },
      // {
      //   firstname: 'Emily',
      //   lastname: 'Brown',
      //   email: 'emily.brown@mail.com',
      //   password: 'password123'
      // },
      // {
      //   firstname: 'Michael',
      //   lastname: 'Davis',
      //   email: 'michael.davis@mail.com',
      //   password: 'passpass'
      // }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};