'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('User', 'userType', {
        type: Sequelize.INTEGER(1),
        defaultValue: 1
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn('User', 'userType')]);
  }
};