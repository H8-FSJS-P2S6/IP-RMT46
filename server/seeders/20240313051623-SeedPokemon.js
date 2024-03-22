'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require('../data/pokemon.json')
      .map((el) => {
        el.createdAt = el.updatedAt = new Date();
        return el;
      });
    await queryInterface.bulkInsert('Pokemons', data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pokemons', null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
  }
};
