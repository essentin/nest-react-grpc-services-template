'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Listing', 'isAllAge', {
        type: Sequelize.BOOLEAN,
      }),
      queryInterface.addColumn('Listing', 'houseRuleDesc', {
        type: Sequelize.TEXT
      }),
      queryInterface.addColumn('Listing', 'wifiName', {
        type: Sequelize.TEXT
      }),
      queryInterface.addColumn('Listing', 'arrivalInstruction', {
        type: Sequelize.TEXT
      }),
      queryInterface.addColumn('Listing', 'spaceSize', {
        type: Sequelize.FLOAT
      }),])
  },

  down: (queryInterface, Sequelize) => {

  }
};