'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.query("update ServiceFees set guestValue = 0, hostValue = 0")
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.query("update ServiceFees set guestValue = 3, hostValue = 9")
  }
};