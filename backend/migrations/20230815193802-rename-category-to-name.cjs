'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('product_categories', 'category', 'name');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('product_categories', 'name', 'category');
  },
};
