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
      username: {
        type: Sequelize.STRING,
        unique: {
          args: true,
          msg: 'username has been taken'
        }
      },
      email: {
        type: Sequelize.STRING,
        unique: {
          args: true,
          msg: 'Email has been registered'
        },
        allowNull: false,
        validate: {
          notNull: { msg: 'Email is required' },
          notEmpty: { msg: 'Email is required' },
          isEmail: { msg: 'Email must be correct' }
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: 8,
          notNull: { msg: 'Password is required' },
          notEmpty: { msg: 'Password is required' }
        },
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