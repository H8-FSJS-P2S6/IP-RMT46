'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Contents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Title is required' },
          notEmpty: { msg: 'Title is required' }
        }
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: 'Please fill description' },
          notEmpty: { msg: 'Please fill description' }
        }
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users'
        }
      },
      CategoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories'
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
    await queryInterface.dropTable('Contents');
  }
};