'use strict';
require('dotenv').config();
const axios = require("axios");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    // const data = require("../data/burgersWithoutIngredients.json")
    //   .map((el) => {
    //     delete (el.id),
    //       el.price = el.price * 15000,
    //       el.createdAt = el.updatedAt = new Date()
    //     return el
    //   })
    // await queryInterface.bulkInsert('Burgers', data);
    console.log(process.env.BURGERS_HUB_API_KEY)
    try {
      const burgersHubEndPoint = "https://burgers-hub.p.rapidapi.com/burgers";
      const options = {
        headers: {
          'X-RapidAPI-Key': process.env.BURGERS_HUB_API_KEY,
          'X-RapidAPI-Host': 'burgers-hub.p.rapidapi.com'
        }
      };
      const response = await axios.get(burgersHubEndPoint, options);
      const burgers = response.data;
      const data = burgers
        .map((el) => {
          return {
            name: el.name,
            desc: el.desc,
            price: el.price * 15000,
            veg: el.veg,
            images: el.images[0].sm,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        })
      await queryInterface.bulkInsert('Burgers', data);
    } catch (error) {
      console.error(error);
    }
  },

  async down(queryInterface, Sequelize) {
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
