'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('ListSettings', 'activityType')
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('ListSettings', 'activityType', {
        type: DataType.INTEGER,
      })
    ]);
  }
};