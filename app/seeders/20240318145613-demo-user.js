'use strict';
const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) reject(err)
      resolve(hash)
    });
  })

  return hashedPassword
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        firstname: null,
        lastname: 'Smith',
        email: 12,
        password: await hashPassword('1234')
      },
      {
        firstname: 'Bob',
        lastname: 'Johnson',
        email: 'bob.johnson@mail.com',
        password: await hashPassword('passowrd')
      },
      {
        firstname: 'Emily',
        lastname: 'Brown',
        email: 'emily.brown@mail.com',
        password: await hashPassword('password123')
      },
      {
        firstname: 'Michael',
        lastname: 'Davis',
        email: 'michael.davis@mail.com',
        password: await hashPassword('passpass')
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};