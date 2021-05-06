'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.dropTable('BedTypes'),
      queryInterface.removeColumn('Listing', 'bedType')
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Listing', 'bedType', {
        type: Sequelize.STRING
      }),
      queryInterface.createTable('BedTypes', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        listId: {
          type: Sequelize.INTEGER,
        },
        bedCount: {
          type: Sequelize.INTEGER,
        },
        bedType: {
          type: Sequelize.INTEGER,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      })
    ]);
  }
};