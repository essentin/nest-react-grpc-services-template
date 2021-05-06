'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Listing', 'contactDialCode', {
        type: Sequelize.STRING(10)
      }),
      queryInterface.addColumn('UserProfile', 'stepTwo', {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      }),,
      queryInterface.addColumn('UserProfile', 'stepThree', {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      })
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Listing', 'contactDialCode'),
      queryInterface.removeColumn('UserProfile', 'stepTwo'),
      queryInterface.removeColumn('UserProfile', 'stepThree')
    ])
  }
};