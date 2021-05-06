'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('UserProfile', 'isPartner', {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }),
      queryInterface.addColumn('Listing', 'isPartner', {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      })
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('UserProfile', 'isPartner'),
      queryInterface.removeColumn('Listing', 'isPartner'),
    ])
  }
};