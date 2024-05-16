'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'users_shipping_data',
      'users_shipping_data_userId_fkey'
    );

    await queryInterface.addConstraint('users_shipping_data', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'users_shipping_data_userId_fkey',
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
      'users_shipping_data',
      'users_shipping_data_userId_fkey'
    );

    await queryInterface.addConstraint('users_shipping_data', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'users_shipping_data_userId_fkey',
      references: {
        table: 'users',
        field: 'id',
      },
    });
  },
};
