'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createTable('Invites', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
          unique: true
        },
        firstName: {
          type: Sequelize.STRING,
        },
        inviteStatus: {
          type: Sequelize.ENUM('invited', 'pending', 'completed'),
          defaultValue: 'invited',
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      }),
      queryInterface.addColumn('UserProfile', 'inviteStatus', {
        type: Sequelize.ENUM('pending', 'completed'),
        defaultValue: 'pending',
      }),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.dropTable('Invites'),
      queryInterface.removeColumn('UserProfile', 'inviteStatus'),
    ])
  }
};
