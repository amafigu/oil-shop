'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'cart_items',
      'cart_items_userOrderId_fkey'
    );

    await queryInterface.addConstraint('cart_items', {
      fields: ['userOrderId'],
      type: 'foreign key',
      name: 'cart_items_userOrderId_fkey',
      references: {
        table: 'user_orders',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'cart_items',
      'cart_items_userOrderId_fkey'
    );

    await queryInterface.addConstraint('cart_items', {
      fields: ['userOrderId'],
      type: 'foreign key',
      name: 'cart_items_userOrderId_fkey',
      references: {
        table: 'user_orders',
        field: 'id',
      },
    });
  },
};
