'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'user_orders',
      'user_orders_userId_fkey'
    );

    await queryInterface.addConstraint('user_orders', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'user_orders_userId_fkey',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'user_orders',
      'user_orders_userId_fkey'
    );

    await queryInterface.addConstraint('user_orders', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'user_orders_userId_fkey',
      references: {
        table: 'users',
        field: 'id',
      },
    });
  },
};
