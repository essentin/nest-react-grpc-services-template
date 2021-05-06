'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Reservation', 'startTime', {
        type: Sequelize.FLOAT,
      }),
      queryInterface.addColumn('Reservation', 'endTime', {
        type: Sequelize.FLOAT,
      }),
      queryInterface.addColumn('Reservation', 'totalHours', {
        type: Sequelize.FLOAT,
      }),
      queryInterface.addColumn('Reservation', 'minHour', {
        type: Sequelize.FLOAT,
      }),
      queryInterface.addColumn('Reservation', 'discountPercentage', {
        type: Sequelize.FLOAT,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
     Add reverting commands here.
     Return a promise to correctly handle asynchronicity.

     Example:
     return queryInterface.dropTable('users');
   */
  }
};
