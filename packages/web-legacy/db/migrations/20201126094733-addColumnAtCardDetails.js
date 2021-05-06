'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('CardDetails', 'cardUserName', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('CardDetails', 'expiryDate', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('CardDetails', 'cardType', {
        type: Sequelize.STRING,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('CardDetails', 'cardUserName'),
      queryInterface.removeColumn('CardDetails', 'expiryDate'),
      queryInterface.removeColumn('CardDetails', 'cardType'),
    ])
  }
};
