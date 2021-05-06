'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Transaction', 'ipn_track_id')
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Transaction', 'ipn_track_id', {
        type: Sequelize.STRING,
      })
    ]);
  }
};