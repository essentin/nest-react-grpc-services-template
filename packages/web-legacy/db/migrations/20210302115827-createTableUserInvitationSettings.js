'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createTable('UserInvitationSettings', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        maxInvites: {
          type: Sequelize.INTEGER,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      })
    ])

  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.dropTable('UserInvitationSettings')
    ])
  }
};
