'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('ListBlockedDates', 'startTime', {
        type: Sequelize.FLOAT,
      }),
      queryInterface.addColumn('ListBlockedDates', 'endTime', {
        type: Sequelize.FLOAT
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {

  }
};