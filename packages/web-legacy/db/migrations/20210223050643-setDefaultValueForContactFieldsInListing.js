'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Listing', 'contactDialCode', {
        type: Sequelize.STRING(10),
        defaultValue: '+46'
      }),
      queryInterface.changeColumn('Listing', 'countryCode', {
        type: Sequelize.STRING(10),
        defaultValue: 'SE'
      })
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Listing', 'contactDialCode', {
        type: Sequelize.STRING(10)
      }),
      queryInterface.changeColumn('Listing', 'countryCode', {
        type: Sequelize.STRING(10)
      })
    ])
  }
};