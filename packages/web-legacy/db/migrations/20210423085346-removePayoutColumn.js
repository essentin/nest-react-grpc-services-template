'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('CancellationDetails', 'payoutToHost'),
      queryInterface.removeColumn('Reservation', 'payoutId')
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('CancellationDetails', 'payoutToHost', {
        type: Sequelize.FLOAT,
        allowNull: false,
      }),
      queryInterface.addColumn('Reservation', 'payoutId', {
        type: Sequelize.INTEGER,
      })
    ]);
  }
};