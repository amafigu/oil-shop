'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'cart_items',
      'cart_items_productId_fkey'
    );

    await queryInterface.addConstraint('cart_items', {
      fields: ['productId'],
      type: 'foreign key',
      name: 'cart_items_productId_fkey',
      references: {
        table: 'products',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'cart_items',
      'cart_items_productId_fkey'
    );

    await queryInterface.addConstraint('cart_items', {
      fields: ['productId'],
      type: 'foreign key',
      name: 'cart_items_productId_fkey',
      references: {
        table: 'products',
        field: 'id',
      },
    });
  },
};
