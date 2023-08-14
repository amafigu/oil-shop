'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'productCategoryId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'product_categories',
        key: 'id',
      },
      allowNull: false,
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'productCategoryId');
  },
};
