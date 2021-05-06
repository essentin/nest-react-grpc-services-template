'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('UserVerifiedInfo', 'isLinkedinConnected', {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      })
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('UserVerifiedInfo', 'isLinkedinConnected')
    ])
  }
};