'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      'users_shipping_data',
      'postal_code',
      'postalCode'
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      'users_shipping_data',
      'postalCode',
      'postal_code'
    );
  },
};
