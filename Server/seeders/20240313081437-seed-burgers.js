'use strict';

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
    const data = require("../data/burgersWithoutIngredients.json")
    .map((el) => {
     delete(el.id),
     el.price = el.price * 15000,
     el.createdAt = el.updatedAt = new Date()
     return el
    })
     await queryInterface.bulkInsert('Burgers', data);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Burgers', null, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    });
  }
};
