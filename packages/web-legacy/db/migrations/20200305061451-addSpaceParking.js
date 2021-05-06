'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn('Listing', 'roomType', 'spaceType'),
      queryInterface.addColumn('Listing', 'isParking', {
        type: Sequelize.BOOLEAN
      }),
      queryInterface.addColumn('Listing', 'parkingDescription', {
        type: Sequelize.TEXT
      })
    ])
  },

  down: (queryInterface, Sequelize) => {

  }
};