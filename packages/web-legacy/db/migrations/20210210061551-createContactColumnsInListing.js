'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Listing', 'contactName', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Listing', 'contactEmail', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Listing', 'contactPhoneNumber', {
        type: Sequelize.STRING
      })
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Listing', 'contactName'),
      queryInterface.removeColumn('Listing', 'contactEmail'),
      queryInterface.removeColumn('Listing', 'contactPhoneNumber')
    ])
  }
};
