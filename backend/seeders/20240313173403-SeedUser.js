'use strict';

const { hashPassword } = require('../helpers/bycrypt.js');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let data = require("../data/users.json").map((perUser)=> {
      perUser.password = hashPassword(perUser.password);
      perUser.createdAt = new Date()
      perUser.updatedAt = new Date()
      return perUser
     })
     await queryInterface.bulkInsert("Users", data, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {})
  }
};
