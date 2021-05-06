'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('UserProfile', 'maxInviteCount', {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }),
      queryInterface.addColumn('UserProfile', 'inviteCode', {
        type: Sequelize.STRING
      })
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('UserProfile', 'maxInviteCount'),
      queryInterface.removeColumn('UserProfile', 'inviteCode')
    ])
  }
};