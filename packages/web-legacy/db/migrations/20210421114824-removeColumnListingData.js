'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('ListingData', 'priceMode'),
      queryInterface.removeColumn('ListingData', 'maxPrice')
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('ListingData', 'priceMode', {
        type: Sequelize.BOOLEAN
      }),
      queryInterface.addColumn('ListingData', 'maxPrice', {
        type: Sequelize.FLOAT
      })
    ]);
  }
};