'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Listing', 'bedrooms'),
      queryInterface.removeColumn('Listing', 'beds'),
      queryInterface.removeColumn('Listing', 'bathroomType'),
      queryInterface.removeColumn('Listing', 'bathrooms'),
      queryInterface.removeColumn('Listing', 'residenceType'),
      queryInterface.removeColumn('Listing', 'houseType'),
      queryInterface.removeColumn('Listing', 'buildingSize'),
      queryInterface.removeColumn('Listing', 'spaceType')
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Listing', 'bedrooms', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Listing', 'beds', {
        type: Sequelize.INTEGER
      }),
      queryInterface.addColumn('Listing', 'bathroomType', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Listing', 'bathrooms', {
        type: Sequelize.FLOAT
      }),
      queryInterface.addColumn('Listing', 'residenceType', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Listing', 'houseType', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Listing', 'buildingSize', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Listing', 'spaceType', {
        type: Sequelize.INTEGER,
      })
    ]);
  }
};