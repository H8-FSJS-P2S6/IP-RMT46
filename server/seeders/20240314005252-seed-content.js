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
   await queryInterface.bulkInsert('Contents', [
    {
      title: 'Islamic Education',
      description: 'With the rapid times, Islamic education faces many challenges. The industrial era 4.0 and society 5.0 has shifted the development of world civilization. This research investigates the challenges of a shifting era for Islamic education. It includes aqidah and akhlaq, which must be prepared to enter the new era. These two things are guidelines that need to be prepared, especially for children as a generational advocates to fortify themselves from the currents of globalization that are not following the teachings of Islam. This research employed qualitative research with a normative approach. It used secondary sources such as books, journals, newspapers, and other documents. Those were valid. Data analysis used descriptive analysis to draw conclusions. This study found that Islamic education can adapt to the new era of society 5.0 by prioritizing critical and innovative thinking. Next, Islamic education must ensure the availability of reliable and competent human resources to strengthen the aqidah and morals of students, especially teachers and education staff.',
      UserId: 1,
      CategoryId: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
