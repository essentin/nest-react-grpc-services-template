'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('ListSettings', 'thumbnail', {
      type: Sequelize.STRING,
    });
  },

  down: (queryInterface, Sequelize) => {
    return (queryInterface.removeColumn('ListSettings', 'thumbnail'));
  }
};
