'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Reviews', 'rating', {
        type: Sequelize.FLOAT,
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Reviews', 'rating', {
        type: Sequelize.FLOAT,
        allowNull: false,
      })
    ])
  }
};
